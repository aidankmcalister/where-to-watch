/* eslint-disable react/prop-types */
import MessageCard from "./MessageCard";

function SearchResults({ results, loading, onSelect }) {
  const handleClick = (result) => {
    onSelect(result);
  };

  return (
    <div className="m-4 flex justify-center">
      {loading && <p>Loading...</p>}
      {results.length === 0 && !loading && (
        <MessageCard text="No results found" />
      )}
      {results.length > 0 && (
        <ul className="grid-cols-2 grid gap-1">
          {results.map((result) => (
            <li
              key={result.id}
              className="flex flex-col items-center p-2 rounded-lg"
              onClick={() => handleClick(result)} // Call onSelect when clicked
            >
              {result.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.title || result.name}
                  className="rounded-lg"
                />
              )}
              <h3 className="text-center text-gray-400 font-semibold">
                {result.title || result.name}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
