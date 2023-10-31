import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal/Index";
import { getTrailerMovie, getDetail } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";

const DetailMovie = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { trailerMovie, genre, detailMovie } = useSelector(
    (state) => state.movie
  );
  const show = () => {
    document.getElementById("my_modal_4").showModal();
  };

  useEffect(() => {
    dispatch(getDetail(movieId));
    dispatch(getTrailerMovie(movieId));
  }, [dispatch, movieId]);

  let imgSrc;
  if (!detailMovie.poster_path || !detailMovie.backdrop_path) {
    imgSrc = `https://fakeimg.pl/380x550/?text=Not+Available+Image`;
  } else {
    imgSrc = `https://image.tmdb.org/t/p/w300/${
      detailMovie.poster_path || detailMovie.backdrop_path
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
            <p className="">
              <h3 className="text-4xl font-bold mb-2 ">{detailMovie.title}</h3>
              <i className="block">
                {genre.map((item) => (
                  <strong key={item.id} className=" text-md md:text-lg">
                    {item.name}
                    {", "}
                  </strong>
                ))}
              </i>
            </p>
            <p className="">⭐ {detailMovie.vote_average}</p>
            <p className="me-2 md:mx-auto">
              <strong className="text-lg md:text-2xl">overview : </strong>
              {detailMovie.overview}
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
      <Modal show={show} keytube={trailerMovie} />
    </>
  );
};

export default DetailMovie;
