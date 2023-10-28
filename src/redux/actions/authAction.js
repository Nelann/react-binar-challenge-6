import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";
import toast from "react-hot-toast";
import { ENDPOINTS } from "../../utils/endpoints";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        email,
        password,
      }
    );
    const { data } = response.data;
    const { token } = data;

    dispatch(setToken(token));

    navigate("/");
    toast.success("Login Successfull", {
      duration: 3000,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error?.response?.data?.message}`, {
        duration: 2000,
      });
      return;
    }

    toast.error(`${error?.message}`, {
      duration: 2000,
    });
  }
};

export const getUser =
  (navigate, navigatePathSuccess, navigatePathError) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { data } = await axios.get(ENDPOINTS.detailUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUser(data?.data));
      if (navigatePathSuccess) navigate(navigatePathSuccess, { replace: true });
    } catch (err) {
      if (navigatePathError) navigate(navigatePathError, { replace: true });
      dispatch(logout());
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};
