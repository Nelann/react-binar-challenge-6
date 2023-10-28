import { useEffect } from "react";
import MovieList from "../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/actions/movieAction";

const PopularMovies = () => {
  const { popular } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-4 md:mx-auto min-h-screen mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-xl">Popular Movies</h2>
      </div>
      <div className="flex md:flex-row flex-wrap justify-center gap-6 text-white mb-12">
        <MovieList movies={popular} />
      </div>
    </section>
  );
};

export default PopularMovies;
