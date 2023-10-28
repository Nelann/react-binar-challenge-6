import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

GuestRoute.propTypes = {
  children: PropTypes.node,
};

export default GuestRoute;
