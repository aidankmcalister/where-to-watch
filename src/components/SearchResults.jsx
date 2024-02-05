/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import ReactLoading from "react-loading";
import { fetchLastAirDate } from "../../api/api";
import MediaCard from "./MediaCard";

export const MediaTypeChip = ({ mediaType }) => {
  return (
    <p
      className={`mr-1 w-5 h-5 flex justify-center p-[.2rem] rounded-md ${
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
          dates[result.id] = lastAirDate || "TBD";
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
        <div className="flex justify-center my-1">
          <ul className="grid-cols-2 lg:grid-cols-5 grid gap-2">
            {filteredAndSortedResults.map((result) => (
              <ContentCard
                key={result.name}
                content={
                  <MediaCard
                    result={result}
                    lastAirDates={lastAirDates}
                    handleClick={handleClick}
                  />
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
