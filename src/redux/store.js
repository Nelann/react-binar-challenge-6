import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  devTools: import.meta.env.MODE === "develoment",
});
