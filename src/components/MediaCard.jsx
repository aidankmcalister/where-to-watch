/* eslint-disable react/prop-types */
import { StarIcon } from "@heroicons/react/24/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { MediaTypeChip } from "./SearchResults";
import { DividingLine } from "./ServiceProviderContainer";

const MediaCard = ({ result, lastAirDates, handleClick, homePage }) => {
  return (
    <li
      key={result.id}
      className="flex flex-col py-1 px-0 rounded-lg"
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
      <div className="mt-1.5 -mb-1">
        <DividingLine />
      </div>
      <div>
        <div
          className={`flex items-start justify-between pt-1 -mr-1 ${
            homePage && "md:min-w-40 min-w-36"
          }`}>
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
            {result.vote_average ? result.vote_average.toFixed(1) : "N/A"} / 10
          </p>
        </div>
        <div className="flex">
          <CalendarIcon className="w-3.5 mr-1" />
          {result.first_air_date ? (
            <p>
              {result.first_air_date.substring(0, 4)} -{" "}
              {lastAirDates[result.id] ? (
                lastAirDates[result.id].substring(0, 4)
              ) : (
                <span className="font-bold text-red-950/80">N/A</span>
              )}
            </p>
          ) : result.release_date ? (
            <p>{result.release_date.substring(0, 4)}</p>
          ) : (
            "N/A"
          )}
        </div>
      </div>
    </li>
  );
};

export default MediaCard;
