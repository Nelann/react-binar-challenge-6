import axios from "axios";
import { setToken } from "../reducers/authReducer";
import toast from "react-hot-toast";

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
