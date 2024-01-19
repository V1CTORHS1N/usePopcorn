import { useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Box from "./Box";
import WatchedList from "./WatchedList";
import MovieList from "./MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetail from "./MovieDetail";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

const API_KEY = "";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, API_KEY);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleMovieIdChange(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onMovieIdChange={handleMovieIdChange} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              API_KEY={API_KEY}
              selectedId={selectedId}
              onMovieIdChange={handleMovieIdChange}
              onAddWatched={handleAddWatched}
              watched={watched}
              key={selectedId}
            />
          ) : (
            <WatchedList
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
