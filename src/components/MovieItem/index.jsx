import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  let imgSrc;
  if (!movie.poster_path || !movie.backdrop_path) {
    imgSrc = `https://fakeimg.pl/380x550/?text=Not+Available+Image`;
  } else {
    imgSrc = `https://image.tmdb.org/t/p/w342/${
      movie.poster_path || movie.backdrop_path
    }`;
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-full md:w-[300px]">
      <figure>
        <img
          src={imgSrc}
          alt="Shoes"
          className="w-full h-full object-top object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie?.title}</h2>
        <p className="italic text-gray-300">{movie?.release_date}</p>
        <p className="">
          <span>⭐</span>
          {movie?.vote_average}
        </p>
        <div
          className="tooltip tooltip-primary xl:tooltip-top md:tooltip-top"
          data-tip={movie?.overview}
        >
          <p className="truncate cursor-pointer">{movie?.overview}</p>
        </div>
        <div className="card-actions justify-end">
          <Link
            to={`/movie/${movie?.id}`}
            className="btn btn-primary inline-flex w-full"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
            See Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object,
};

export default MovieItem;
