import React from "react";

export default function MovieList({ movies, onMovieIdChange }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onMovieIdChange={onMovieIdChange}/>
      ))}
    </ul>
  );
}

function Movie({ movie, onMovieIdChange }) {
  return (
    <li key={movie.imdbID} onClick={() => onMovieIdChange(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
