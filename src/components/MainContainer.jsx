import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import ServiceProviderContainer from "./ServiceProviderContainer";
import { searchMoviesAndShows, fetchSearchProviders } from "../../api/api"; // Import your API modules

function MainContainer() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [providers, setProviders] = useState(null); // State to store service providers

  const handleSearch = async (query) => {
    setSelected(null);
    setLoading(true);
    try {
      const searchResults = await searchMoviesAndShows(query);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (media) => {
    setSelected(media);
    try {
      const providersData = await fetchSearchProviders(media.id);
      setProviders(providersData);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  return (
    <div className="m-4 flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      {!selected ? (
        <SearchResults
          results={results}
          loading={loading}
          onSelect={handleSelect}
        />
      ) : (
        <ServiceProviderContainer media={selected} providers={providers} />
      )}
    </div>
  );
}

export default MainContainer;
