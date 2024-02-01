/* eslint-disable react/prop-types */
import ContentCard from "./ContentCard";

function SearchResults({ results, loading, onSelect }) {
  const handleClick = (result) => {
    onSelect(result);
  };

  return (
    <ContentCard
      content={
        <div className="flex justify-center">
          {loading && <p>Loading...</p>}
          {results.length === 0 && !loading && (
            <ContentCard content="No results found" />
          )}
          {results.length > 0 && (
            <ul className="grid-cols-2 grid gap-1">
              {results.map((result) => (
                <ContentCard
                  key={result.name}
                  content={
                    <li
                      key={result.id}
                      className="flex flex-col p-2 rounded-lg"
                      onClick={() => handleClick(result)}>
                      {result.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                          alt={result.title || result.name}
                          className="rounded-lg"
                        />
                      )}
                      <h3 className="text-gray-700 font-semibold">
                        {result.title || result.name}
                      </h3>
                      <p>{result.vote_average.toFixed(1)} / 10</p>
                      {result.first_air_date && (
                        <p>{result.first_air_date.substring(0, 4)}</p>
                      )}
                    </li>
                  }
                />
              ))}
            </ul>
          )}
        </div>
      }
    />
  );
}

export default SearchResults;
