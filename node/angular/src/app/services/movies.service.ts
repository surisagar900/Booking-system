import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieUrl = environment.moviesUrl;
  movieApiUrl = environment.movieApi;

  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http
      .get<any>(this.movieUrl + 'trending/movie/week' + this.movieApiUrl)
      .pipe(map((it) => it.results));
  }
}
