export interface Actor {
    id: string;
    name: string;
}

export interface Movie {
    id: string;
    title: string;
    genre: string;
    year: number;
    imageUrl: string;
    actors: Actor[];
}

export interface SearchQuery { 
    actor?: string;
    genre?: string;
    title?: string;
}