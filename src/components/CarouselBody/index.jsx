import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const CarouselBody = ({ movie, idTrailer }) => {
  return (
    <div className="absolute top-0 transform translate-y-16 md:translate-x-8 xl:translate-x-40 md:translate-y-24 xl:translate-y-44 flex flex-col md:w-4/5 xl:w-2/5 md:space-y-4 space-y-2 mx-3">
      <p className="text-white font-bold text-xl md:text-4xl xl:text-6xl">
        {movie?.title}
      </p>
      <div className="flex items-center space-x-2">
        <button className="font-semibold text-yellow-500 outline-none border-none drop-shadow-md" />
        <p className="font-semibold text-white">⭐ {movie?.vote_average}</p>
      </div>
      <p
        className={"text-white text-sm md:text-base text-justify line-clamp-3"}
      >
        {movie?.overview}
      </p>
      <div className="flex flex-col sm:flex-row justify-start items-start md:items-center space-y-2 md:space-y-0 sm:space-x-4">
        <div className="flex">
          <a
            className="btn btn-sm btn-primary"
            href={`https://www.youtube.com/watch?v=${idTrailer}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </span>
            Watch Trailer
          </a>
        </div>
        <div>
          <NavLink
            className="btn btn-sm btn-primary"
            to={`/movie/${movie?.id}`}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
            See Detail
          </NavLink>
        </div>
      </div>
    </div>
  );
};

CarouselBody.propTypes = {
  movie: PropTypes.object,
  idTrailer: PropTypes.string,
};

export default CarouselBody;
