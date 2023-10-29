import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieItem from "../components/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../redux/actions/movieAction";

const Search = () => {
  const [searchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.movie);
  const query = searchParam.get("query");
  const page = searchParam.get("page");

  useEffect(() => {
    dispatch(getSearchResults(page, query));
  }, [dispatch, page, query]);

  return (
    <section className="max-w-7xl mx-4 md:mx-auto min-h-screen mt-10 mb-10">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Result from {'"' + query + '"'}</h2>
      </div>
      {search.length < 1 ? (
        <div className="flex md:flex-row flex-wrap justify-center gap-6">
          <h2 className="text-xl md:text-3xl font-bold">
            {'"' + query + '"'} Not Found :(
          </h2>
        </div>
      ) : (
        <div className="flex md:flex-row flex-wrap justify-center gap-6">
          {search?.map((item) => (
            <MovieItem key={item.id} movie={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Search;
