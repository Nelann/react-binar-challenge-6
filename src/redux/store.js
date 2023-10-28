import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import thunk from "redux-thunk";

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
  devTools: import.meta.env.MODE === "development",
});
