const API_URL = import.meta.env.VITE_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

export const ENDPOINTS = {
  login: `${API_URL}/api/v1/auth/login`,
  register: `${API_URL}/api/v1/auth/register`,
  popularMovies: `${API_URL}/api/v1/movie/popular`,
  searchMovies: (page,query) => {
   return `${API_URL}/api/v1/search/movie?page=${page}&query=${query}`;
  },
  detailMovie: (id) => {
    return `${API_URL}/api/v1/movie/${id}`;
  },
  detailUser: `${API_URL}/api/v1/auth/me`,
  googleOauthClientId: GOOGLE_CLIENT_ID,
};
