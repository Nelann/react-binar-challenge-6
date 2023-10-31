import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  trailerMovie: null,
  search: [],
  detailMovie: [],
  genre: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setTrailer: (state, action) => {
      state.trailerMovie = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDetail: (state, action) => {
      state.detailMovie = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export const {
  setPopular,
  setTrailer,
  setSearch,
  setDetail,
  setGenre,
  setVideos,
} = movieSlice.actions;

export const movieReducer = movieSlice.reducer;
