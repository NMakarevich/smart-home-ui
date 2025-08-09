import { Component } from '@angular/core';
import { Login } from '../../components/login/login';

@Component({
  selector: 'app-login-page',
  imports: [Login],
  templateUrl: './login-page.html',
  standalone: true,
  styleUrl: './login-page.scss',
})
export class LoginPage {}
