export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl: string;
  year: number;
  rating: number;
  genre: string[];
  duration: string;
  synopsis: string;
  trailerUrl: string;
  releaseDate?: string;
  isUpcoming: boolean;
  type?: 'movie' | 'series';
  director?: string;
  cast?: string[];
  spotlightReason?: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type GenreFilter = 
  | 'All'
  | 'Sci-Fi'
  | 'Drama'
  | 'Action'
  | 'Thriller'
  | 'Crime'
  | 'Adventure'
  | 'Animation';
