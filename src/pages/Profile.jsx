import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/authAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(navigate, null, null));
  }, [dispatch, navigate]);

  return (
    <section className="max-w-7xl mx-4 md:mx-auto h-screen mt-8 grid place-content-center">
      <div className="card md:w-96 bg-base-300 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://placekitten.com/600/600"
            alt="Avatar"
            className="rounded-full w-60 h-60 border-4 border-white/50 shadow-md"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white capitalize">{user?.name}</h2>
          <p className="text-white">
            User or Admin : <span className="capitalize">{user?.type}</span>
          </p>
          <p className="text-white">Email: {user?.email}</p>
          <div className="card-actions w-full">
            <Link className="btn btn-primary w-full" to="/">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
