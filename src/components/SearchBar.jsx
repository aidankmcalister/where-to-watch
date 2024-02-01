/* eslint-disable react/prop-types */
import { useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

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
    <form
      onSubmit={handleSubmit}
      className=" bg-white/40 rounded-full flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="h-10 px-3 rounded-full rounded-r-none bg-transparent"
      />
      <button type="submit" className="text-gray-500 m-1">
        <MagnifyingGlassCircleIcon className="w-8" />
      </button>
    </form>
  );
}

export default SearchBar;
