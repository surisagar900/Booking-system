import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  public login(userName: string, password: string): Observable<any> {
    return this.http
      .post(this.serverUrl + 'login', {
        username: userName,
        password: password,
      })
      .pipe(
        tap((i) => {
          localStorage.setItem('loggedIn', JSON.stringify(i));
        })
      );
  }

  public register(model: registerModel): Observable<any> {
    return this.http.post(this.serverUrl + 'signup', model);
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
