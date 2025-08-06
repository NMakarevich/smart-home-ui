import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse, Profile } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  authStatus$ = new BehaviorSubject(this.checkToken());

  get authStatus() {
    return this.authStatus$;
  }

  login(login: Login) {
    return this.http.post<LoginResponse>('/user/login', login, {
      observe: 'response',
    });
  }

  get profile() {
    return this.http.get<Profile>('/user/profile');
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  checkToken() {
    return !!localStorage.getItem('auth-token');
  }

  saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  logout() {
    this.authStatus$.next(false);
    this.clearToken();
  }

  loginSuccess(token: string) {
    this.authStatus$.next(true);
    this.saveToken(token);
  }

  clearToken() {
    localStorage.removeItem('auth-token');
  }
}
