import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  loggedInUser = new BehaviorSubject<number>(null);

  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public login(userName: string, password: string): Observable<any> {
    return this.http
      .post(this.serverUrl + 'login', {
        username: userName,
        password: password,
      })
      .pipe(
        catchError(this.handleErrors),
        tap((response) => {
          this.handleToken(response);
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('LoggedInUserData'));
    if (!userData) {
      return;
    }
    this.loggedInUser.next(userData.id);
  }

  public register(model: registerModel): Observable<any> {
    return this.http.post(this.serverUrl + 'signup', model).pipe(
      catchError(this.handleErrors),
      tap((response) => {
        this.handleToken(response);
      })
    );
  }

  logOut() {
    this.loggedInUser.next(null);
    localStorage.removeItem('LoggedInUserData');
    location.reload();
    this.router.navigate(['/']);
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error Occurred';
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    return throwError(errRes.error.message);
  }

  private handleToken(res: { id: number; token: string }) {
    this.loggedInUser.next(res.id);
    localStorage.setItem('LoggedInUserData', JSON.stringify(res));
  }
}

export interface registerModel {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}
