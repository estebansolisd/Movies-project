import { Movie } from "../types";

interface MovieState {
    movies: Movie[]
    status: string;
}

export searchMovies = createasyncthunk