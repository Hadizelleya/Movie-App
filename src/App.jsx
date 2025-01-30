import { useEffect, useState } from "react";
import logo from "../public/logo.png";
import banner from "../public/hero.png";
import "./App.css";
import Search from "./components/Search";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const MAIN_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [decouncedSearchTerm, setDecouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(
    () => {
      setDecouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query
        ? `${MAIN_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&api_key=${API_KEY}`
        : `${MAIN_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
      const res = await axios.get(endpoint);
      setMovies(res?.data);
      setLoading(false);

      if (query && res?.data?.results?.length > 0) {
        await updateSearchCount(query, res?.data?.results[0]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMovies(decouncedSearchTerm);
  }, [decouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  if (error) return <h1>something wrong have happened please try again</h1>;

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="w-full flex flex-col gap-15">
          <div>
            <img src={logo} className=" w-20" alt="logo" />
          </div>

          <div className="w-full h-full">
            <img src={banner} alt="banner-image" className="w-full" />
          </div>

          <h1 className=" text-7xl">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-15 ">
          <h2 className=" text-center">All Movies</h2>
          <div className="all-movies mt-10">
            {loading ? (
              <div className="flex items-center justify-center mt-10">
                <Spinner />
              </div>
            ) : (
              <ul>
                {movies?.results.map((movie, index) => (
                  <div key={index}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
