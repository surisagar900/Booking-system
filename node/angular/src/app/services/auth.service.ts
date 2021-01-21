import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  loggedInUser = new BehaviorSubject<number>(null);
  private tokenTime: any;
  private serverUrl = environment.serverUrl;

  // this is the response on login/register
  // { id: data[0].id, token: token, expiresIn: tokenExpiresInMiliSeconds, role: userRole.admin }

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

    const loadedUser = new userLocalData(
      userData.id,
      userData.role,
      userData.token,
      userData.expiresIn
    );

    if (loadedUser._token) {
      this.loggedInUser.next(loadedUser.userId);
      const expiryDuration =
        new Date(userData.expiresIn).getTime() - new Date().getTime();
      this.autoLogOut(expiryDuration);
    }
  }

  logOut() {
    this.loggedInUser.next(null);
    localStorage.removeItem('LoggedInUserData');
    if (this.tokenTime) {
      clearTimeout(this.tokenTime);
    }
    this.tokenTime = null;
    this.router.navigate(['/']);
  }

  autoLogOut(expirationDuration: number) {
    this.tokenTime = setTimeout(() => {
      this.logOut;
    }, expirationDuration);
  }

  public register(model: registerModel): Observable<any> {
    return this.http.post(this.serverUrl + 'signup', model).pipe(
      catchError(this.handleErrors),
      tap((response) => {
        this.handleToken(response);
      })
    );
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error Occurred';
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    return throwError(errRes.error.message);
  }

  private handleToken(res: {
    id: number;
    token: string;
    expiresIn: number;
    role: number;
  }) {
    const expiryDate = new Date(new Date().getTime() + res.expiresIn).getTime();
    const userData = new userLocalData(res.id, res.role, res.token, expiryDate);
    this.loggedInUser.next(userData.userId);
    localStorage.setItem('LoggedInUserData', JSON.stringify(userData));
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

export class userLocalData {
  constructor(
    public userId: number,
    public role: number,
    private token: string,
    private expiryTimestamp: number
  ) {}

  get _token() {
    if (!this.expiryTimestamp || new Date().getTime() > this.expiryTimestamp) {
      return null;
    }
    return this.token;
  }
}
