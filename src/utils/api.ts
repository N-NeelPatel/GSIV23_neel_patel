import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL

export const getUpcomingMovies = () => {
    return axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
};

export const getMovieCredits = (movieId:string) => {
    return axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
};

export const getUpcomingMoviesPage = (currentPage: number) => {
    return axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}&page=${currentPage + 1}`);
};

export const getSingleMovieInfo = (movieId: string) => {
    return axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
}

export const getSearchResult = (searchTerm: string) => {
    return axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}`);
}