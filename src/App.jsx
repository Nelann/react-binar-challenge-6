import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./wrapper/ProtectedRoute";
import GuestRoute from "./wrapper/GuestRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PopularMovies from "./pages/PopularMovies";
import DetailMovie from "./pages/DetailMovie";
import Search from "./pages/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./redux/store";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ENDPOINTS } from "./utils/endpoints";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={ENDPOINTS.googleOauthClientId}>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Header />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/popular-movies" element={<PopularMovies />} />
              <Route path="/movie/:movieId" element={<DetailMovie />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Authorization */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
