/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import ReactLoading from "react-loading";

function SearchResults({ results, loading, onSelect }) {
  const [displayResults, setDisplayResults] = useState(false);
  const [filteredAndSortedResults, setFilteredAndSortedResults] = useState([]);

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

    return () => clearTimeout(timer);
  }, [results]);

  const handleClick = (result) => {
    onSelect(result);
  };

  if (loading || !displayResults) {
    return (
      <ContentCard
        content={
          // <div className="flex justify-center">
          //   <p>Loading...</p>
          // </div>
          // <LoadingContainer />
          <ReactLoading
            type={"spinningBubbles"}
            color={"#e879f9"}
            height={"5rem"}
            width={"5rem"}
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
                        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                        alt={result.title || result.name}
                        className="rounded-lg"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/2000x3000"
                        alt={result.title || result.name}
                        className="rounded-lg"
                      />
                    )}

                    <h3 className="text-gray-700 font-semibold">
                      {result.title || result.name}
                    </h3>
                    <p>
                      {result.vote_average
                        ? result.vote_average.toFixed(1)
                        : "N/A"}{" "}
                      / 10
                    </p>
                    <p>
                      {result.first_air_date
                        ? result.first_air_date.substring(0, 4)
                        : result.release_date
                        ? result.release_date.substring(0, 4)
                        : "N/A"}
                    </p>
                  </li>
                }
              />
            ))}
          </ul>
        </div>
      }
    />
  );
}

export default SearchResults;

// import ContentCard from "./ContentCard";

// function SearchResults({ results, loading, onSelect }) {
//   const handleClick = (result) => {
//     onSelect(result);
//   };

//   const filteredResults = results.filter((result) => result.name);

//   const sortedResults = filteredResults.sort(
//     (a, b) => b.popularity - a.popularity
//   );

//   return (
//     <ContentCard
//       content={
//         <div className="flex justify-center">
//           {loading && <p>Loading...</p>}
//           {sortedResults.length === 0 && !loading && <p>No results found</p>}
//           {sortedResults.length > 0 && (
//             <ul className="grid-cols-2 lg:grid-cols-5 grid gap-1">
//               {sortedResults.map((result) => (
//                 <ContentCard
//                   key={result.name}
//                   content={
//                     <li
//                       key={result.id}
//                       className="flex flex-col p-2 rounded-lg"
//                       onClick={() => handleClick(result)}>
//                       {result.poster_path ? (
//                         <img
//                           src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
//                           alt={result.title || result.name}
//                           className="rounded-lg"
//                         />
//                       ) : (
//                         <img
//                           src="https://placehold.co/2000x3000"
//                           alt={result.title || result.name}
//                           className="rounded-lg"
//                         />
//                       )}

//                       <h3 className="text-gray-700 font-semibold">
//                         {result.title || result.name}
//                       </h3>
//                       <p>
//                         {result.vote_average
//                           ? result.vote_average.toFixed(1)
//                           : "N/A"}{" "}
//                         / 10
//                       </p>
//                       <p>
//                         {result.first_air_date
//                           ? result.first_air_date.substring(0, 4)
//                           : result.release_date
//                           ? result.release_date.substring(0, 4)
//                           : "N/A"}
//                       </p>
//                     </li>
//                   }
//                 />
//               ))}
//             </ul>
//           )}
//         </div>
//       }
//     />
//   );
// }

// export default SearchResults;
