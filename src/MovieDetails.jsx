import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MAIN_URL, API_KEY } from "./App";
import Info from "./components/Info";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime - hours * 60;

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`
      );
      setMovie(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (loading) return <h2>loading...</h2>;
  //www.youtube.com/watch?v=${key}
  return (
    <div className="lg:px-20 sm:px-4">
      <div className="movie-details gap-2 w-full">
        {/* header and title */}
        <div className="flex flex-row justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div>
            <h2 className="text-4xl max-sm:text-xl">{movie.title}</h2>
          </div>
          <div className=" flex flex-row rating gap-2 items-center justify-center px-3 py-2 rounded-xl ">
            <img src="../public/star.svg" alt="rating icon" />
            <p className="text-white mt-1 text-xl">
              {movie?.vote_average?.toFixed(1)}{" "}
              <span className=" text-gray-100">/10</span>
            </p>
          </div>
        </div>
        {/* release date */}
        <div className="flex flex-row gap-2 ">
          <p className=" text-blue-200 text-xl">
            {movie.release_date?.split("-")[0]}
          </p>
          <p className=" text-blue-200 text-xl">
            {Math.floor(movie.runtime / 60)}H <span>{mins} Mins</span>
          </p>
        </div>

        {/* image and video */}
        <div className="flex min-lg:flex-row gap-5 flex-col justify-center items-center  mt-10">
          <div>
            <img
              src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-blue-50 shadow-sm"
            />
          </div>
          <div className="w-full h-full flex-1">
            <iframe
              src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              className=" w-full h-[750px] rounded-xl "
            ></iframe>
          </div>
        </div>

        {/* genres */}
        <div className="flex flex-col w-full items-start justify-center gap-10 mt-15">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="flex items-center gap-10">
              <p className="text-blue-200 text-2xl">Genres:</p>
              <div className="flex items-center gap-2 flex-wrap">
                {movie?.genres?.map((genre) => (
                  <p
                    className="text-white genre p-4 max-w-max text-nowrap text-xl rounded-md"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <Link
                to={movie.homepage}
                target="_blank"
                className="homepage-button p-4 text-xl text-black font-bold cursor-pointer rounded-md"
              >
                Visit homepage
              </Link>
            </div>
          </div>
          <Info
            title={"Overview"}
            styles={"w-300 text-justify"}
            description={movie?.overview}
          />
          <Info title={"Release Date"} description={movie?.release_date} />
          <Info
            title={"Origin Country"}
            description={movie?.origin_country ? movie?.origin_country : "N/A"}
          />
          <Info title={"Status"} description={movie?.status} />
          <div className="flex flex-row items-center justify-start gap-10 w-full">
            <p className="text-2xl text-blue-200">Languages:</p>
            {movie?.spoken_languages?.map((language) => (
              <p key={language?.english_name} className="text-xl  description">
                {language?.english_name}
              </p>
            ))}
          </div>
          <Info title={"Budget"} description={`$${movie?.budget / 1000000}M`} />
          <Info
            title={"Revenue"}
            description={`$${(movie?.revenue / 1000000)?.toFixed(0)}M`}
          />
          <Info title={"Tagline"} description={movie.tagline} />

          <div className="flex flex-row items-center justify-start gap-10 w-full">
            <p className="text-2xl text-blue-200">Production Companies:</p>
            {movie?.production_companies?.map((company) => (
              <p
                key={company?.id}
                className="text-xl max-w-max text-nowrap description"
              >
                {company?.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
