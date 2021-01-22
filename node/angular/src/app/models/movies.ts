export interface movies {
  id: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  media_type: string;
}

export interface Movie {
  movieId: number;
  movieName: string;
  movieDesc: string;
  moviePoster: string;
  movieRating: number;
  moviePrice: number;
  movieImg: string;
}
