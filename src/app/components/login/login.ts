import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Auth } from '../../services/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  userName: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatIconButton,
    MatInput,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  private readonly formBuilder = new FormBuilder();

  hidePassword = signal(true);

  togglePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  loginForm: FormGroup<LoginForm> = this.formBuilder.nonNullable.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.loginForm.setErrors(null);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.loginForm.setErrors({
            loginError: 'Invalid username or password',
          });
        } else
          this.loginForm.setErrors({
            loginError: 'Unknown error occurred. Please try again later.',
          });
      },
    });
  }
}
