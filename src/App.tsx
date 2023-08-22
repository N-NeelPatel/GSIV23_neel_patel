import "./App.css";
import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import EmptyState from "./components/EmptyState";
import Detail from "./components/Detail";
import { AiFillHome } from "react-icons/ai";
import { getUpcomingMovies, getUpcomingMoviesPage } from "./utils/api";

function App() {
  const [movieData, setMoviedata] = useState(null);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then((response) => {
        setMoviedata(response.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredMovies(null);
      return;
    }

    const filtered = movieData.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
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

  const moviesToDisplay = filteredMovies || movieData;

  return (
    <>
      <div className="top-navigation flex justify-between items-center p-3 shadow-lg">
        <Search onSearch={handleSearch} />
        <AiFillHome className="text-[#4A4A4A] mr-3" />
      </div>
      <div className="flex flex-wrap p-3">
        {/* {moviesToDisplay && <Detail movieData={moviesToDisplay[0]} />} */}
        {!moviesToDisplay || moviesToDisplay.length === 0 ? (
          <EmptyState />
        ) : (
          moviesToDisplay &&
          moviesToDisplay.map((movie) => (
            <div className="pb-3 pr-3">
              <MovieCard key={movie.id} movieData={movie} />
            </div>
          ))
        )}
      </div>
      {moviesToDisplay && moviesToDisplay.length > 0 && (
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
  );
}

export default App;
