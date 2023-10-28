import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/actions/movieAction";

const Home = () => {
  const { popular } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  const slicePopularMovies = popular.slice(0, 15);

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
