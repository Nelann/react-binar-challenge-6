import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SearchForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query || query === null) return;

    navigate(`/search?page=1&query=${query}`);

    setQuery("");

    if (onClose() === null || onClose() === undefined) return;
    onClose();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movie here..."
        className="input input-bordered input-md w-full rounded-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

SearchForm.propTypes = {
  onClose: PropTypes.func,
};

export default SearchForm;
