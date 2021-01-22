import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private configURL = environment.serverUrl;
  private localData;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.localData = auth.loggedInUser.getValue();
  }

  getAllUserData(): Observable<User[]> {
    return this.http
      .get<User[]>(this.configURL + 'user')
      .pipe(catchError(this.handleErrors));
  }

  addAdmin(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.configURL + 'adminsignup', {
        username: username,
        password: password,
      })
      .pipe(catchError(this.handleErrors));
  }

  getUserData(): Observable<User> {
    let userId: number;
    if (this.localData) userId = this.localData.id;
    return this.http
      .get<User>(this.configURL + 'user/' + userId)
      .pipe(catchError(this.handleErrors));
  }

  editUserData(userEditData): Observable<any> {
    let userId: number;
    if (this.localData) userId = this.localData.id;
    return this.http
      .put<any>(this.configURL + 'user/' + userId, userEditData)
      .pipe(catchError(this.handleErrors));
  }

  deleteUserData(): Observable<any> {
    let userId: number;
    if (this.localData) userId = this.localData.id;
    return this.http
      .delete<any>(this.configURL + 'user/' + userId)
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
