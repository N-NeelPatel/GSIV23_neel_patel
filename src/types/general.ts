export interface MovieData {
    id: string;
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
}

export interface MovieDetail {
    title: string;
    vote_average: number;
    release_date: string;
    runtime: string;
    overview: string;
    poster_path: string;
}

export interface Member {
    id: string;
    job: string;
    name: string;
}
  
export interface CastDetail {
    crew: Member[];
    cast: Member[];
}

export interface RouteParams {
    id: string;
}

export interface MovieCardProps {
    movieData: MovieData;
}

export interface SearchProps {
    onSearch: (searchTerm: string) => void;
}