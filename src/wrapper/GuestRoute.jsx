import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../redux/actions/authAction";
import { useEffect } from "react";

const GuestRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(navigate, "/", null));
  }, [token, dispatch, navigate]);

  return children ? children : <Outlet />;
};

GuestRoute.propTypes = {
  children: PropTypes.node,
};

export default GuestRoute;
