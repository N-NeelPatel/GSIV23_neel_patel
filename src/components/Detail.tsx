import { useState, useEffect } from "react";
import { getSingleMovieInfo, getMovieCredits } from "../utils/api";

export default function Detail({ movieData }) {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const overview = movieData.overview;
  const movieRating = movieData.vote_average * 10;
  const movieTitle = movieData.title;

  const [movieDetail, setMoviedetail] = useState(null);
  const [error, setError] = useState(null);
  const [castDetail, setCastdetail] = useState(null);
  const [directorName, setDirectorname] = useState(null);

  const movieId = "976573"; // test id, need to change this

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCastdetail(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchMovieInfo = async () => {
      try {
        const response = await getSingleMovieInfo(movieId);
        setMoviedetail(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovieCredits();
    fetchMovieInfo();
  }, [movieId]);

  useEffect(() => {
    const findDirector = () => {
      if (castDetail && castDetail.crew) {
        const director = castDetail.crew.find(
          (member) => member.job === "Director"
        );
        if (director) {
          setDirectorname(director.name);
        }
      }
    };

    findDirector();
  }, [movieDetail]);

  return (
    <>
      <div className="flex">
        <img
          src={`${imageBaseUrl}${movieData.poster_path}`}
          className="h-[250px] w-[200px]"
        />
        <div className="ml-4">
          <div className="flex items-center">
            <div className="text-xl font-semibold">{movieTitle}</div>
            <div
              className={`${
                movieRating >= 70
                  ? "text-green-500"
                  : movieRating >= 50
                  ? "text-yellow-500"
                  : "text-red-500"
              } ml-4 mt-[1px]`}
            >
              ({movieRating}%)
            </div>
          </div>
          <div className="mt-2">
            {movieData.release_date.substring(0, 4)} |{" "}
            {movieDetail ? movieDetail.runtime : ""} min | {directorName}
          </div>
          <div className="leading-5 mt-2">
            Cast:{" "}
            {castDetail &&
              castDetail.cast
                .slice(0, 20)
                .map((cast) => cast.name)
                .join(", ")}
            {castDetail && castDetail.cast.length > 20 ? " ..." : ""}
          </div>
          <div className="leading-5 mt-2">Description: {overview}</div>
        </div>
      </div>
    </>
  );
}
