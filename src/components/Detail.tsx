import { useState, useEffect } from "react";
import { getSingleMovieInfo, getMovieCredits } from "../utils/api";
import { useParams } from "react-router-dom";

interface RouteParams {
    id: string;
}

export default function Detail() {
  const { id } = useParams<RouteParams>();
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  const [movieDetail, setMoviedetail] = useState(null);
  const [castDetail, setCastdetail] = useState(null);
  const [directorName, setDirectorname] = useState(null);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await getMovieCredits(id);
        setCastdetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMovieInfo = async () => {
      try {
        const response = await getSingleMovieInfo(id);
        setMoviedetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieCredits();
    fetchMovieInfo();
  }, [id]);

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
  }, [movieDetail, castDetail]);

  return (
    <>
      {movieDetail && (
        <div className="flex">
          <img
            src={`${imageBaseUrl}${movieDetail.poster_path}`}
            className="h-[250px] w-[200px]"
          />
          <div className="ml-4">
            <div className="flex items-center">
              <div className="text-xl font-semibold">{movieDetail.title}</div>
              <div
                className={`${
                  Math.round(movieDetail.vote_average * 10) >= 70
                    ? "text-green-500"
                    : Math.round(movieDetail.vote_average * 10) >= 50
                    ? "text-yellow-500"
                    : "text-red-500"
                } ml-4 mt-[1px]`}
              >
                ({Math.round(movieDetail.vote_average * 10)}%)
              </div>
            </div>
            <div className="mt-2">
              {movieDetail.release_date.substring(0, 4)} |{" "}
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
            <div className="leading-5 mt-2">
              Description: {movieDetail.overview}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
