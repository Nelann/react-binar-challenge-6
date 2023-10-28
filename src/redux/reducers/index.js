import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { movieReducer } from "./movieReducer";

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

