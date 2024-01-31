/* eslint-disable react/prop-types */
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-blue-500 rounded-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="h-8 px-1"
      />
      <button type="submit" className="mx-2 my-1 text-white font-medium">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
