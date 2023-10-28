import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import { setPopular, setTrailer } from "../reducers/movieReducer";
import toast from "react-hot-toast";

export const getPopularMovies = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    if (!token) return;

    const { data } = await axios.get(ENDPOINTS.popularMovies, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPopular(data?.data));
  } catch (err) {
    toast.error(`Error: ${err}`);
  }
};

export const getTrailerMovie = (movieId) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    if (!token) return;

    const DETAIL_URL = ENDPOINTS.detailMovie(movieId);

    const { data } = await axios.get(DETAIL_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const videos = data?.data?.videos;

    const idTrailer = videos
      ?.filter((trailer) => trailer.type)
      ?.find((t) => t.type === "Trailer");

    dispatch(setTrailer(idTrailer?.key));
  } catch (err) {
    toast.error(`Error: ${err}`);
  }
};
