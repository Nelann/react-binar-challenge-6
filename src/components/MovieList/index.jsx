import PropTypes from "prop-types";
import MovieItem from "../MovieItem";

const MovieList = ({ movies }) => {
  return (
    <>
      {movies?.map((movie) => (
        <MovieItem key={movie?.id} movie={movie} />
      ))}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
};

export default MovieList;
