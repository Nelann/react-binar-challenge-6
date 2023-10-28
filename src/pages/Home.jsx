import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { useEffect, useState } from "react";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const getPopularMovies = async () => {
      try {
        const { data } = await axios.get(ENDPOINTS.popularMovies, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPopularMovies(data?.data);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };
    getPopularMovies();
  }, []);

  const slicePopularMovies = popularMovies.slice(0, 15);

  return (
    <>
      <Carousel />
      <section className="max-w-7xl mx-4 md:mx-auto mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-semibold text-xl">Popular Movies</h2>
          <Link
            to="/popular-movies"
            className="italic text-red-500 hover:underline hover:decoration-wavy"
          >
            More Popular Movies
          </Link>
        </div>
        <div className="flex md:flex-row flex-wrap justify-center gap-6 text-white mb-12">
          <MovieList movies={slicePopularMovies} />
        </div>
      </section>
    </>
  );
};

export default Home;
