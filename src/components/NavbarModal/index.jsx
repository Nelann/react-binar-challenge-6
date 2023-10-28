import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm";

const NavbarModal = ({ onClose, user, onLogout }) => {
  return (
    <div className="fixed w-screen min-h-screen transition-all duration-300 ease-in-out">
      <div className="bg-slate-900 bg-opacity-50 w-full mx-auto min-h-screen backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center">
        <div className="shadow-md bg-slate-900 w-full rounded-xl py-8 px-4 space-y-4 mx-4">
          <div className="flex flex-row justify-between items-center">
            <NavLink
              to="/"
              className="font-semibold text-lg"
              onClick={() => onClose()}
            >
              Home
            </NavLink>
            <button onClick={() => onClose()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            <NavLink
              to="/popular-movies"
              className="font-semibold text-lg"
              onClick={() => onClose()}
            >
              Popular Movies
            </NavLink>
          </div>
          <div>
            <SearchForm onClose={onClose} />
          </div>
          <hr className="outline-none border-none bg-white w-full py-[2px] rounded-full" />
          <div className="mt-8 space-y-4">
            {user !== null ? (
              <div className="flex flex-col space-y-3">
                <NavLink
                  to="/profile"
                  className="font-semibold my-2 capitalize"
                  onClick={() => onClose()}
                >
                  {user?.name}
                </NavLink>
                <button
                  className="btn btn-md btn-primary rounded-xl"
                  onClick={() => onLogout()}
                >
                  Logout →
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <NavLink
                  to="/login"
                  className="inline-block text-center px-6 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600"
                  onClick={() => onClose()}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-block text-center px-6 py-3 rounded-xl font-semibold outline outline-1 hover:text-white bg-transparent hover:bg-red-600 hover:border-none "
                  onClick={() => onClose()}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

NavbarModal.propTypes = {
  onClose: PropTypes.func,
  onLogout: PropTypes.func,
  user: PropTypes.object,
};

export default NavbarModal;
