import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      dispatch(getUser(navigate, null, "/login"));
    }
  }, [token, dispatch, navigate]);

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
