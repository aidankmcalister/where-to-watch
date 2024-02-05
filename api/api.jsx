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

const fetchLastAirDate = async (seriesId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
    );

    if (response?.data?.last_air_date) {
      return response.data.last_air_date;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching last air date:", error);
    throw error;
  }
};

const fetchFeaturedMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );

    if (response?.data?.results) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching featured movies:", error);
    throw error;
  }
};

// Function to fetch featured TV shows
const fetchFeaturedTVShows = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
    );

    if (response?.data?.results) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching featured TV shows:", error);
    throw error;
  }
};

export {
  searchMoviesAndShows,
  fetchSearchProviders,
  fetchLastAirDate,
  fetchFeaturedMovies,
  fetchFeaturedTVShows,
};
