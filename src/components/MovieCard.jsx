import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`movie-details/${movie.id}`}>
      <div className="flex flex-col movie-card  gap-3 cursor-pointer">
        <img
          src={
            movie?.poster_path
              ? `https://media.themoviedb.org/t/p/w500/${movie.poster_path}`
              : "../../public/no-movie.png"
          }
          alt="movie image"
        />
        <h3>{movie.title}</h3>
        <div className="content gap-6 items-center">
          <div className="rating">
            <img src="../../public/star.svg" alt="rating-icon" />
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
          <ul className="flex flex-row items-center gap-6 list-disc ">
            <span>
              <li>
                {" "}
                {movie?.original_language
                  ? movie?.original_language.toUpperCase()
                  : "N/A"}
              </li>
            </span>

            <span>
              <li>
                {" "}
                {movie?.release_date
                  ? movie?.release_date.split("-")[0]
                  : "N/A"}
              </li>
            </span>
          </ul>
        </div>
      </div>
    </Link>
  );
}
