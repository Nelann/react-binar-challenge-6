import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

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
    <section className="max-w-7xl mx-4 md:mx-auto h-screen mt-8 grid place-content-center">
      <div className="card md:w-96 bg-base-300 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://placekitten.com/600/600"
            alt="Avatar"
            className="rounded-full w-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">{user?.name}</h2>
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
