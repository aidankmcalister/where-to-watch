/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import ReactLoading from "react-loading";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";
// import { ClockIcon } from "@heroicons/react/24/outline";
import { fetchLastAirDate } from "../../api/api";

const MediaTypeChip = ({ mediaType }) => {
  return (
    <p
      className={`mr-1 w-5 h-5 flex justify-center items-center p-[.2rem] rounded-md ${
        mediaType === "MV" ? "bg-yellow-500/50" : "bg-blue-500/50"
      } text-white font-bold text-[.6rem]`}>
      {mediaType}
    </p>
  );
};

const SearchResults = ({ results, loading, onSelect }) => {
  const [displayResults, setDisplayResults] = useState(false);
  const [filteredAndSortedResults, setFilteredAndSortedResults] = useState([]);
  const [lastAirDates, setLastAirDates] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayResults(true);
    }, 300);

    // Filter results that have a name
    const filteredResults = results.filter((result) => {
      return (result.name || result.title) && result.poster_path;
    });

    // Sort the filtered results by popularity
    const sortedResults = filteredResults.sort(
      (a, b) => b.popularity - a.popularity
    );

    setFilteredAndSortedResults(sortedResults);

    // Fetch last air dates for each series
    const fetchLastAirDates = async () => {
      const dates = {};
      for (const result of sortedResults) {
        if (result.first_air_date) {
          const lastAirDate = await fetchLastAirDate(result.id);
          dates[result.id] = lastAirDate || "No Last Air Date";
        }
      }
      setLastAirDates(dates);
    };

    fetchLastAirDates();

    return () => clearTimeout(timer);
  }, [results]);

  const handleClick = (result) => {
    onSelect(result);
  };

  if (loading || !displayResults) {
    return (
      <ContentCard
        content={
          <ReactLoading
            type={"spinningBubbles"}
            color={"#e879f9"}
            height={"5rem"}
            width={"5rem"}
            className="m-10"
          />
        }
      />
    );
  }

  if (filteredAndSortedResults.length === 0 && !loading) {
    return (
      <ContentCard
        content={
          <div className="flex justify-center">
            <p>No results found</p>
          </div>
        }
      />
    );
  }

  return (
    <ContentCard
      content={
        <div className="flex justify-center">
          <ul className="grid-cols-2 lg:grid-cols-5 grid gap-1">
            {filteredAndSortedResults.map((result) => (
              <ContentCard
                key={result.name}
                content={
                  <li
                    key={result.id}
                    className="flex flex-col p-2 rounded-lg"
                    onClick={() => handleClick(result)}>
                    {result.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                        alt={result.title || result.name}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/2000x3000"
                        alt={result.title || result.name}
                        className="rounded-lg"
                      />
                    )}
                    <div>
                      <div className="flex items-start justify-between pt-1 -mr-1">
                        <h3 className="text-gray-700 font-semibold -mt-1">
                          {result.title || result.name}
                        </h3>
                        {result.first_air_date ? (
                          <MediaTypeChip mediaType="TV" />
                        ) : (
                          <MediaTypeChip mediaType="MV" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="text-yellow-500 w-3.5 mr-1" />
                        <p>
                          {result.vote_average
                            ? result.vote_average.toFixed(1)
                            : "N/A"}{" "}
                          / 10
                        </p>
                      </div>
                      <div className="flex">
                        <ClockIcon className="w-3.5 mr-1" />
                        {result.first_air_date ? (
                          <p>
                            {result.first_air_date.substring(0, 4)} -{" "}
                            {lastAirDates[result.id]
                              ? lastAirDates[result.id].substring(0, 4)
                              : "No Last Air Date"}
                          </p>
                        ) : result.release_date ? (
                          <p>{result.release_date.substring(0, 4)}</p>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                  </li>
                }
              />
            ))}
          </ul>
        </div>
      }
    />
  );
};

export default SearchResults;
