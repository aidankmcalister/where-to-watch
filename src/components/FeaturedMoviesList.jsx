/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import ContentCard from "./ContentCard";
import { fetchFeaturedMovies, fetchLastAirDate } from "../../api/api"; // Import your API modules
import MediaCard from "./MediaCard";

const FeaturedMoviesList = ({ handleSelect }) => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [lastAirDates, setLastAirDates] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchFeaturedMovies();
        setFeaturedMovies(movies);
        fetchLastAirDates(movies);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const fetchLastAirDates = async (movies) => {
    try {
      const dates = {};
      for (const movie of movies) {
        if (movie.first_air_date) {
          const lastAirDate = await fetchLastAirDate(movie.id);
          dates[movie.id] = lastAirDate || "TBD";
        }
      }
      setLastAirDates(dates);
    } catch (error) {
      console.error("Error fetching last air dates:", error);
    }
  };

  const handleClick = (result) => {
    handleSelect(result);
  };

  return (
    <ContentCard
      content={
        <ul className="flex overflow-x-scroll scrollbar-hide space-x-2">
          {featuredMovies.map((result) => (
            <ContentCard
              key={result.id}
              content={
                <MediaCard
                  result={result}
                  lastAirDates={lastAirDates}
                  handleClick={handleClick}
                  homePage={true}
                />
              }
            />
          ))}
        </ul>
      }
    />
  );
};

export default FeaturedMoviesList;
