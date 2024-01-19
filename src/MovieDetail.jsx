import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./useKey";

export default function MovieDetail({
  selectedId,
  onMovieIdChange,
  onAddWatched,
  watched,
  API_KEY,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const target = watched.filter((ele) => ele.imdbId === selectedId);
  const isWatched = target.length > 0;
  const [userRating, setUserRating] = useState(
    isWatched ? target[0].userRating : 0
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function fetchMovieById() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieById();
    },
    [selectedId, API_KEY]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", () => onMovieIdChange(null));

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onMovieIdChange(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    setInitialRating={userRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        onAddWatched({
                          imdbId: selectedId,
                          title,
                          year,
                          poster,
                          imdbRating: Number(imdbRating),
                          userRating: userRating,
                          runtime: runtime.split(" ").at(0),
                        });
                        onMovieIdChange(null);
                      }}
                    >
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {userRating}
                  <span> ⭐️</span>
                </p>
              )}
            </div>
            <h3>Summary</h3>
            <p>
              <em>{plot}</em>
            </p>
            <h3>Starring</h3>
            <p>{actors}</p>
            <h3>Directed by</h3>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}
