import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  public bookSeat(
    userId: number,
    movieName: string,
    seat: string,
    name: string
  ): Observable<any> {
    return this.http
      .post(this.serverUrl + 'booking', {
        movie: movieName,
        seat: seat,
        name: name,
      })
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
