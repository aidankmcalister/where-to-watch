import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import WelcomeCard from "./WelcomeCard";
import ServiceProviderContainer from "./ServiceProviderContainer";
import { searchMoviesAndShows, fetchSearchProviders } from "../../api/api"; // Import your API modules

function MainContainer() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [providers, setProviders] = useState(null); // State to store service providers
  const [providersLoading, setProvidersLoading] = useState(false); // State to track loading of service providers

  const handleSearch = async (query) => {
    setSearchQuery(query); // Update search query state
    setLoading(true);
    try {
      const searchResults =
        query.trim() === "" ? [] : await searchMoviesAndShows(query);
      setResults(searchResults);
      setSelected(null); // Reset selected state when a new search is initiated
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (media) => {
    setSelected(media);
    setProvidersLoading(true); // Set providers loading state
    try {
      const providersData = await fetchSearchProviders(media.id);
      setProviders(providersData);
      console.log("Selected:", selected);
      console.log("Providers:", providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setProvidersLoading(false); // Reset providers loading state
    }
  };

  return (
    <div className="m-4 flex flex-col items-center max-w-7xl">
      <SearchBar onSearch={handleSearch} />
      {searchQuery === "" && !selected && <WelcomeCard />}
      {searchQuery !== "" && !selected && (
        <SearchResults
          results={results}
          loading={loading}
          onSelect={handleSelect}
        />
      )}
      {selected && !providersLoading && (
        <ServiceProviderContainer media={selected} providers={providers} />
      )}
    </div>
  );
}

export default MainContainer;
