import axios from "axios";

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchSearchProviders = async (seriesId, mediaType) => {
  try {
    const providersResponse = await axios.get(
      `${BASE_URL}/${mediaType}/${seriesId}/watch/providers?api_key=${API_KEY}`
    );

    if (providersResponse?.data?.results) {
      return providersResponse.data.results;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching search providers:", error);
    throw error;
  }
};
// https://api.themoviedb.org/3/search/multi?query=woah&include_adult=false&language=en-US&page=1
const searchMoviesAndShows = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response?.data?.results) {
      return response.data.results.slice(0, 20);
    }
  } catch (error) {
    console.error("Error searching movies and shows:", error);
    throw error;
  }
};

export { searchMoviesAndShows, fetchSearchProviders };
