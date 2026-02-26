export interface Movie {
    id: string;
    genre: string;
    title: string;
    year: number;
    actor: string[];
}

export interface SearchQuery {
    actor?: string;
    title?: string;
    genre?: string;
}