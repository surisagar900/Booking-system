import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Movie } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private configURL = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAllMovieData(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.configURL + 'movie')
      .pipe(catchError(this.handleErrors));
  }

  getMovieData(movieId: number): Observable<Movie> {
    return this.http
      .get<Movie>(this.configURL + 'movie/' + movieId)
      .pipe(catchError(this.handleErrors));
  }

  editMovieData(movieResponse: any): Observable<any> {
    let formData = new FormData();
    formData.append('movieName', movieResponse.movieName + '');
    formData.append('movieDesc', movieResponse.movieDesc + '');
    formData.append('moviePrice', movieResponse.moviePrice + '');
    formData.append('movieRating', movieResponse.movieRating + '');
    formData.append('moviePoster', movieResponse.moviePoster + '');
    formData.append('movieImg', movieResponse.movieImg);
    return this.http
      .put<any>(this.configURL + 'movie/' + movieResponse.movieId, formData)
      .pipe(catchError(this.handleErrors));
  }

  addMovieData(movieResponse: any): Observable<any> {
    let formData = new FormData();
    formData.append('movieName', movieResponse.movieName + '');
    formData.append('movieDesc', movieResponse.movieDesc + '');
    formData.append('moviePrice', movieResponse.moviePrice + '');
    formData.append('movieRating', movieResponse.movieRating + '');
    formData.append('moviePoster', movieResponse.moviePoster + '');
    formData.append('movieImg', movieResponse.movieImg);
    return this.http
      .post<any>(this.configURL + 'movie', formData)
      .pipe(catchError(this.handleErrors));
  }

  deleteMovieData(movieId: number): Observable<any> {
    return this.http
      .delete<any>(this.configURL + 'movie/' + movieId)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error Occurred';
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    return throwError(errRes.error.message);
  }
}
