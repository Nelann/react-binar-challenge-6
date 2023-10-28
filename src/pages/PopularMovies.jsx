import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { ENDPOINTS } from "../utils/endpoints";
import axios from "axios";

const PopularMovies = () => {
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

  return (
    <section className="max-w-7xl mx-4 md:mx-auto min-h-screen mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-xl">Popular Movies</h2>
      </div>
      <div className="flex md:flex-row flex-wrap justify-center gap-6 text-white mb-12">
        <MovieList movies={popularMovies} />
      </div>
    </section>
  );
};

export default PopularMovies;
