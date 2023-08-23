import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import EmptyState from "./components/EmptyState";
import Detail from "./components/Detail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {
  getUpcomingMovies,
  getUpcomingMoviesPage,
  getSearchResult,
} from "./utils/api";

interface MovieData {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

function App() {
  const [movieData, setMoviedata] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await getUpcomingMovies();
        setMoviedata(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpcomingMovies();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(!!searchTerm);

    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await getSearchResult(searchTerm);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreMovies = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await getUpcomingMoviesPage(currentPage);
      const newMovies = response.data.results;
      setMoviedata((prevMovies) => [...prevMovies, ...newMovies]);
      setCurrentPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleLoadMoreClick = () => {
    loadMoreMovies();
  };

  const moviesToDisplay = isSearching ? searchResults : movieData;

  return (
    <Router>
      <>
        <div className="top-navigation flex justify-between items-center p-3 shadow-lg min-w-[512px]">
          {location.pathname.includes("movie") ? (
            <div className="px-2 py-[4.5px]">Movie Details</div>
          ) : (
            <Search onSearch={handleSearch} />
          )}
          <a href="/">
            <AiFillHome className="text-[#4A4A4A] mr-3" />
          </a>
        </div>
        <div className="flex flex-wrap p-3">
          <Switch>
            <Route exact path={"/"}>
              {!moviesToDisplay || moviesToDisplay.length === 0 ? (
                <EmptyState />
              ) : (
                moviesToDisplay.map((movie: MovieData) => (
                  <div className="pb-3 pr-3" key={movie.id}>
                    <a href={`/movie/${movie.id}`}>
                      <MovieCard movieData={movie} />
                    </a>
                  </div>
                ))
              )}
            </Route>
            <Route path="/movie/:id">
              <Detail />
            </Route>
          </Switch>
        </div>
        {!isSearching &&
          moviesToDisplay &&
          moviesToDisplay.length > 0 &&
          location.pathname === "/" && (
            <div className="flex justify-center p-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLoadMoreClick}
              >
                Load More
              </button>
            </div>
          )}
      </>
    </Router>
  );
}

export default App;
