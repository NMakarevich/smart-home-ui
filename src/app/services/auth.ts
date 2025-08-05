import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse, Profile } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  authStatus$ = new BehaviorSubject(false);

  getAuthStatus() {
    return this.authStatus$.getValue();
  }

  login(login: Login) {
    return this.http.post<LoginResponse>('/user/login', login);
  }

  getProfile() {
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
  }

  loginSuccess() {
    this.authStatus$.next(true);
  }

  clearToken() {
    localStorage.removeItem('auth-token');
  }
}
