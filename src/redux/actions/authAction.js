import axios from "axios";
import toast from "react-hot-toast";
import { setToken, setUser } from "../reducers/authReducer";
import { ENDPOINTS } from "../../utils/endpoints";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
      email,
      password,
    });
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

export const register = (name, email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
    const { data } = response.data;
    const { token } = data;

    dispatch(setToken(token));

    navigate("/");
    toast.success("Register Successfull", {
      duration: 3000,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error?.response?.data?.message);
      return;
    }

    toast.error(`${error?.message}`, {
      duration: 3000,
    });
  }
};

export const registerLoginWithGoogleAction = (accessToken, navigate) => async (dispatch) => {
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/api/v1/auth/google`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error?.response?.data?.message}`, {
        duration: 3000,
      });
      return;
    }

    toast.error(`${error?.message}`, {
      duration: 3000,
    });
  }
};

export const getUser = (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
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
