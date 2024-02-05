/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import { fetchFeaturedTVShows, fetchLastAirDate } from "../../api/api"; // Import your API modules
import MediaCard from "./MediaCard";

const FeaturedTVList = ({ handleSelect }) => {
  const [featuredTVShows, setFeaturedTVShows] = useState([]);
  const [lastAirDates, setLastAirDates] = useState({});

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const TVShows = await fetchFeaturedTVShows();
        setFeaturedTVShows(TVShows);
        fetchLastAirDates(TVShows);
      } catch (error) {
        console.error("Error fetching featured TV shows:", error);
      }
    };

    fetchTVShows();
  }, []);

  const fetchLastAirDates = async (TVShows) => {
    try {
      const dates = {};
      for (const show of TVShows) {
        if (show.first_air_date) {
          const lastAirDate = await fetchLastAirDate(show.id);
          dates[show.id] = lastAirDate || "TBD";
        }
      }
      setLastAirDates(dates);
    } catch (error) {
      console.error("Error fetching last air dates for TV shows:", error);
    }
  };

  const handleClick = (result) => {
    handleSelect(result);
  };

  return (
    <ContentCard
      content={
        <ul className="flex overflow-x-scroll scrollbar-hide space-x-2">
          {featuredTVShows.map((result) => (
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

export default FeaturedTVList;
