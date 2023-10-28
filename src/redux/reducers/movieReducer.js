import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  trailerMovie: null,
  isLoading: false,
  error: null,
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
  },
});

export const { setPopular, setTrailer } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
