import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Modal from "../components/Modal/Index";

const DetailMovie = () => {
  const [key, setKey] = useState("");
  const [genres, setgenres] = useState([]);
  const [dataFilm, setDataFilm] = useState([]);
  const token = localStorage.getItem("token");

  const { movieId } = useParams();

  const show = () => {
    document.getElementById("my_modal_4").showModal();
  };

  useEffect(() => {
    const getData = async (id) => {
      const DETAIL_URL = ENDPOINTS.detailMovie(id);
      try {
        const response = await axios.get(DETAIL_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data;
        setDataFilm(data?.data);
        setgenres(data?.data?.genres);
        const videos = data?.data?.videos;
        const videoTrailer = videos?.find((video) =>
          video.type.includes("Trailer")
        );
        setKey(videoTrailer.key);
      } catch (error) {
        console.log(error);
      }
    };
    getData(movieId);
  }, [movieId, token]);

  let imgSrc;
  if (!dataFilm.poster_path || !dataFilm.backdrop_path) {
    imgSrc = `https://fakeimg.pl/380x550/?text=Not+Available+Image`;
  } else {
    imgSrc = `https://image.tmdb.org/t/p/w300/${
      dataFilm.poster_path || dataFilm.backdrop_path
    }`;
  }

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col justify-start md:flex-row xl:flex-row w-full space-x-9">
          <img
            src={imgSrc}
            className=" rounded-lg shadow-2xl w-6/12 sm:w-5/12 md:w-3/12 xl:3/12"
          />
          <div className="space-y-4 justify-start md:w-7/12">
            <h3 className="text-4xl font-bold ">{dataFilm.title}</h3>
            <p className="">
              <i className="block">
                {genres.map((item) => (
                  <strong key={item.id} className=" text-md md:text-lg">
                    {item.name}
                    {", "}
                  </strong>
                ))}
              </i>
            </p>
            <p className="">⭐ {dataFilm.vote_average}</p>
            <p className="me-2 md:mx-auto">
              <strong className="text-lg md:text-2xl">overview : </strong>
              {dataFilm.overview}
            </p>
            <button className="btn btn-primary" onClick={() => show()}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </span>
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} keytube={key} />
    </>
  );
};

export default DetailMovie;
