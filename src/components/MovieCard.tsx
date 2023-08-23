interface MovieData {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

interface MovieCardProps {
  movieData: MovieData;
}

export default function MovieCard({ movieData }: MovieCardProps) {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const overview = movieData.overview;
  const movieRating = Math.round(movieData.vote_average * 10);
  const movieTitle = movieData.title;
  return (
    <div className="w-[200px] shadow-lg rounded-b-xl">
      <img
        src={`${imageBaseUrl}${movieData.poster_path}`}
        className="rounded-t-xl h-[250px] w-full"
      />
      <div className="w-full p-1.5">
        <div className="flex justify-between font-semibold items-start">
          <div>
            {movieTitle && movieTitle.length <= 16
              ? movieTitle
              : movieTitle.substring(0, 16) + "..."}
          </div>
          <div
            className={`${
              movieRating >= 70
                ? "text-green-500"
                : movieRating >= 50
                ? "text-yellow-500"
                : "text-red-500"
            } ml-2`}
          >
            {movieRating}%
          </div>
        </div>
        <div>
          {overview && overview.length <= 35
            ? overview
            : overview.substring(0, 35) + "..."}
        </div>
      </div>
    </div>
  );
}
