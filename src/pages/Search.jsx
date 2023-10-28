import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import MovieItem from "../components/MovieItem";

const Search = () => {
  const [dataResult, setDataResult] = useState([]);
  const token = localStorage.getItem("token");
  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");
  const page = searchParam.get("page");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getMovie = async (page, query) => {
      try {
        const SEARCH_URL = ENDPOINTS.searchMovies(page, query);
        const response = await axios.get(SEARCH_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response.data;
        setDataResult(data);
      } catch (errors) {
        alert(errors);
      }
    };
    getMovie(page, query);
  }, [page, query, token]);

  return (
    <section className="max-w-7xl mx-4 md:mx-auto min-h-screen mt-10 mb-10">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Result from {'"' + query + '"'}</h2>
      </div>
      {dataResult.length < 1 ? (
        <div className="flex md:flex-row flex-wrap justify-center gap-6">
          <h2 className="text-xl md:text-3xl font-bold">
            {'"' + query + '"'} Not Found :(
          </h2>
        </div>
      ) : (
        <div className="flex md:flex-row flex-wrap justify-center gap-6">
          {dataResult?.map((item) => (
            <MovieItem key={item.id} movie={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Search;
