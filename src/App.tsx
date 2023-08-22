import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import EmptyState from "./components/EmptyState";
import Detail from "./components/Detail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {
  getUpcomingMovies,
  getUpcomingMoviesPage,
  getSearchResult,
} from "./utils/api";

function App() {
  const [movieData, setMoviedata] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUpcomingMovies()
      .then((response) => {
        setMoviedata(response.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSearch = async (searchTerm) => {
    setIsSearching(!!searchTerm);

    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await getSearchResult(searchTerm);
      setSearchResults(response.data.results);
    } catch (error) {
      setError(error);
    }
  };

  const loadMoreMovies = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    getUpcomingMoviesPage(currentPage)
      .then((response) => {
        const newMovies = response.data.results;
        setMoviedata((prevMovies) => [...prevMovies, ...newMovies]);
        setCurrentPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const handleLoadMoreClick = () => {
    loadMoreMovies();
  };

  const moviesToDisplay = isSearching ? searchResults : movieData;

  return (
    <Router>
      <>
        <div className="top-navigation flex justify-between items-center p-3 shadow-lg min-w-[512px]">
          {location.pathname.includes('movie') ? <div className="px-2 py-[4.5px]">Movie Details</div> : <Search onSearch={handleSearch} />}
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
            moviesToDisplay.map((movie) => (
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
        {!isSearching && moviesToDisplay && moviesToDisplay.length > 0 && location.pathname === "/" && (
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
