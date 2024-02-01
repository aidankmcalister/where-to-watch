import axios from "axios";

// eslint-disable-next-line no-undef
// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchSearchProviders = async (seriesId) => {
  try {
    // let isTVSeries = false;
    let mediaType = "";

    let response = await axios.get(
      `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}`
    );
    if (response && response.data && response.data.id) {
      //   isTVSeries = true;
      mediaType = "tv";
    } else {
      response = await axios.get(
        `${BASE_URL}/movie/${seriesId}?api_key=${API_KEY}`
      );
      if (response && response.data && response.data.id) {
        mediaType = "movie";
      } else {
        throw new Error("Invalid seriesId");
      }
    }

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

const searchMoviesAndShows = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&with_original_language=hi&page=1`
    );

    if (response?.data?.results) {
      return response.data.results.slice(0, 15);
    }
  } catch (error) {
    console.error("Error searching movies and shows:", error);
    throw error;
  }
};

export { searchMoviesAndShows, fetchSearchProviders };
