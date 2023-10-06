import { TMDB_AUTH } from "../config/api";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TMDB_AUTH 
  }
};

const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

// For movies data fetching
export const fetchNowplaying = () => fetchData('movie/now_playing?language=en-US&page=1');
export const fetchPopular = () => fetchData('movie/popular?language=en-US&page=1');
export const fetchTopRate = () => fetchData('movie/top_rated?language=en-US&page=1');
export const fetchUpcoming = () => fetchData('movie/upcoming?language=en-US&page=1');
export const fetchSingleMovie = ({itemId}) => fetchData(`movie/${itemId}?language=en-US`);

// For TV data fetching
export const fetchAiringToday = () => fetchData('tv/airing_today?language=en-US&page=1');
export const fetchOnAir = () => fetchData('tv/on_the_air?language=en-US&page=1');
export const fetchPopularTV = () => fetchData('tv/popular?language=en-US&page=1');
export const fetchTopRateTV = () => fetchData('tv/top_rated?language=en-US&page=1');
export const fetchSingletv = ({itemId}) => fetchData(`tv/${itemId}?language=en-US`);

// for search
export const searchMovie = ({searchKeyword}) => fetchData(`/search/movie?query=${searchKeyword}&language=en-US&page=1'`);
export const searchMulti = ({searchKeyword}) => fetchData(`/search/multi?query=${searchKeyword}&language=en-US&page=1'`);
export const searchTV = ({searchKeyword}) => fetchData(`/search/tv?query=${searchKeyword}&language=en-US&page=1'`);