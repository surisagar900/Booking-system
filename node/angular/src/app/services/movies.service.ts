import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieUrl = environment.moviesUrl;
  movieApiUrl = environment.movieApi;

  private configUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http
      .get<any>(this.movieUrl + 'trending/movie/week' + this.movieApiUrl)
      .pipe(map((it) => it.results));
  }

  getMovieById(id: number) {
    return this.http.get<any>(this.movieUrl + `movie/${id}` + this.movieApiUrl);
  }

  addMovie(addMovie: any) {
    return this.http
      .post(this.configUrl, addMovie)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error Occurred';
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.message) {
      case 'NO_MOVIES':
        errorMessage = 'No any movies yet';
        break;
      case 'MOVIE_ALREADY_EXIST':
        errorMessage = 'movie already exist';
        break;
      case 'MOVIE_NOT_EXIST':
        errorMessage = 'movie not exist';
        break;
      case 'MOVIENAME_OCCUPIED':
        errorMessage = 'movie occupied';
        break;
    }
    return throwError(errorMessage);
  }
}
