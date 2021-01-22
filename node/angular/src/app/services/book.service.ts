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

  bookSeat(userId: number, movieId: number, seat: string): Observable<any> {
    return this.http
      .post(this.serverUrl + 'booking/' + movieId, {
        seat: seat,
        userId: userId,
      })
      .pipe(catchError(this.handleErrors));
  }

  bookedSeats(movieId: number): Observable<{ bookedSeats: string[] }> {
    return this.http
      .get<{ bookedSeats: string[] }>(this.serverUrl + 'bookedseats/' + movieId)
      .pipe(catchError(this.handleErrors));
  }

  forPrinting(bookingId: number): Observable<any> {
    return this.http
      .get<any>(this.serverUrl + 'getticket/' + bookingId)
      .pipe(catchError(this.handleErrors));
  }

  bookingHistory(): Observable<any> {
    return this.http
      .get<any>(this.serverUrl + 'bookinghistory')
      .pipe(catchError(this.handleErrors));
  }

  deleteBooking(movieId: number): Observable<any> {
    return this.http
      .delete<any>(this.serverUrl + 'clearbooking/' + movieId)
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
