/* eslint-disable react/prop-types */
import { useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState(false);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchError(false); // Reset search error flag when query changes
    onSearch(newQuery);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/40 rounded-full flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="h-10 px-3 rounded-full rounded-r-none bg-transparent lg:w-[30rem]"
      />
      <button type="submit" className="text-gray-500 m-1">
        <MagnifyingGlassCircleIcon className="w-8" />
      </button>
      {searchError && (
        // eslint-disable-next-line react/no-unescaped-entities
        <p className="text-red-500">No results found for "{query}"</p>
      )}
    </form>
  );
}

export default SearchBar;
