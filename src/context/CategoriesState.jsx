import { useEffect, useState, useCallback } from "react";
import CategoriesContext from "./CategoriesContext";

// Custom hook for fetching movie data
const useMoviesByGenre = (genresId) => {
  const [genresDetails, setGenresDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTczMjI5MzMwOS42MzYzNjM3LCJzdWIiOiI2NzE5M2M2NTVkMGRlODkwNDJkOGNjYzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.D8PuTAUcytmByfmtlnRTVnAjjMRnQm-FLgvFxF5dtYs",
    },
  };

  // Fetch movies by genre when genresId changes
  useEffect(() => {
    if (!genresId) return;

    const fetchAllPages = async () => {
      setIsFetching(true);
      setError(null); // Reset error state on new fetch
      const allMovies = [];

      try {
        for (let page = 1; page <= 15; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genresId}`,
            options
          );
          const data = await response.json();
          allMovies.push(...data.results);
        }
        setGenresDetails(allMovies);
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
        console.error("Error fetching movies:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllPages();
  }, [genresId]);

  return { genresDetails, isFetching, error };
};

const CategoriesState = (props) => {
  const [genresList, setGenresList] = useState([]);
  const [genresId, setGenresId] = useState("28"); // Default genre ID (Action in TMDB)
  const [isFetchingGenres, setIsFetchingGenres] = useState(true);

  const { genresDetails, isFetching, error } = useMoviesByGenre(genresId);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTczMjI5MzMwOS42MzYzNjM3LCJzdWIiOiI2NzE5M2M2NTVkMGRlODkwNDJkOGNjYzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.D8PuTAUcytmByfmtlnRTVnAjjMRnQm-FLgvFxF5dtYs",
    },
  };

  // Fetch genres list on component mount
  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options);
        const data = await response.json();
        setGenresList(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsFetchingGenres(false);
      }
    };

    fetchGenresList();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        genresList,
        genresDetails,
        genresId,
        setGenresId, // Adding setGenresId to allow changing the genre
        isFetchingGenres,
        isFetching,
        error, // Adding error so components can show messages
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
