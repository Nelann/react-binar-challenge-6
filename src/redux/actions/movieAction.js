import axios from "axios";
import { ENDPOINTS } from "../../utils/endpoints";
import {
  setPopular,
  setTrailer,
  setSearch,
  setDetail,
  setGenre,
} from "../reducers/movieReducer";
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

export const getSearchResults = (page, query) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;
    const SEARCH_URL = ENDPOINTS.searchMovies(page, query);
    const response = await axios.get(SEARCH_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response.data;
    dispatch(setSearch(data));
  } catch (err) {
    toast.error(`Error: ${err}`);
  }
};

export const getDetail = (id) => async (dispatch, getState) => {
  const DETAIL_URL = ENDPOINTS.detailMovie(id);
  try {
    const { token } = getState().auth;
    const response = await axios.get(DETAIL_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response?.data;
    dispatch(setDetail(data?.data));
    dispatch(setGenre(data?.data?.genres));
  } catch (err) {
    toast.error(`Error: ${err}`);
  }
};
