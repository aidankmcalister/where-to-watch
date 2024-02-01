/* eslint-disable react/prop-types */
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
      className=" bg-blue-500 rounded-md flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="h-8 px-1 rounded-l-md rounded-r-none"
      />
      <button type="submit" className=" text-white font-medium">
        <MagnifyingGlassIcon className="w-6 m-1" />
      </button>
    </form>
  );
}

export default SearchBar;
