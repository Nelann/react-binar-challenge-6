import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import CarouselBody from "../CarouselBody";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions/movieAction";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { popular } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const [popularMoviesSlice, setPopularMoviesSlice] = useState([]);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    if (popular?.length > 0) {
      setPopularMoviesSlice(popular.slice(0, 3));
    }
  }, [popular]);

  const renderedCarouselItem = popularMoviesSlice.map((movie) => {
    // Getting video trailer
    const videos = movie?.videos;

    const idTrailer = videos
      ?.filter((trailer) => trailer.type)
      ?.find((t) => t.type === "Trailer").key;

    let imgSrc;
    if (!movie.poster_path || !movie.backdrop_path) {
      imgSrc = `https://fakeimg.pl/350x200/?text=Not+Available+Image`;
    } else {
      imgSrc = `https://image.tmdb.org/t/p/w1280/${
        movie.backdrop_path || movie.poster_path
      }`;
    }
    return (
      <div className="embla__slide relative cursor-grab" key={movie?.id}>
        <img
          className="w-full h-screen md:h-full xl:h-full object-cover contrast-50"
          src={imgSrc}
          alt={movie?.title}
        />
        <CarouselBody movie={movie} idTrailer={idTrailer} />
      </div>
    );
  });

  return (
    <div
      className="overflow-hidden bg-gray-200 w-full h-[480px] mx-auto md:h-fit xl:h-2/3 group"
      ref={emblaRef}
    >
      <div className="flex">{renderedCarouselItem}</div>
      <div className="absolute top-1/2 left-1 md:top-[25%] xl:top-1/2 cursor-pointer md:left-1 xl:left-10">
        <button onClick={scrollPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hidden group-hover:block rounded-full bg-slate-800 shadow-sm w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-1 md:top-[25%] xl:top-1/2 cursor-pointer md:right-1 xl:right-10">
        <button onClick={scrollNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hidden group-hover:block rounded-full bg-slate-800 shadow-sm w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
