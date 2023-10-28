import { ENDPOINTS } from "../../utils/endpoints";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarModal from "../NavbarModal";
import SearchForm from "../SearchForm";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("Successfully logout", {
      duration: 2000,
    });
    window.location.replace("/login");
  };

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(ENDPOINTS.detailUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data?.data);
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    getDetailUser();
  }, []);

  return (
    <header className="sticky top-0 z-30 ">
      <nav className="navbar px-4 md:px-4 items-center border-b border-b-gray-200 bg-white dark:bg-slate-900 dark:border-b-slate-700 bg-opacity-30 backdrop-filter backdrop-blur-lg firefox:bg-opacity-80">
        <div className="navbar-start h-16">
          <Link
            to="/"
            className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-red-500"
          >
            MovieReview
          </Link>
        </div>
        <div className="navbar-center hidden lg:block w-full max-w-xl">
          <SearchForm />
        </div>
        <div className="navbar-end">
          <div className="flex-none items-center block lg:hidden">
            <button type="button" onClick={handleToggleModal}>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:space-x-4 sm:hidden lg:block">
            {user !== null ? (
              <>
                <Link to="/profile">{user?.name}</Link>
                <button
                  className="btn btn-sm btn-primary rounded-full"
                  onClick={handleLogout}
                >
                  Logout →
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-full font-semibold outline outline-1 hover:text-white bg-transparent hover:bg-red-600 hover:border-none "
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isOpen ? (
        <NavbarModal
          onClose={handleToggleModal}
          onLogout={handleLogout}
          user={user}
        />
      ) : null}
    </header>
  );
};

export default Header;
