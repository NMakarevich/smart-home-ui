import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { LoginResponse } from '../interfaces/auth';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(Auth);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401) {
          router.navigate(['login']).then(() => {
            auth.logout();
            auth.clearToken();
          });
        }

        if (req.url.endsWith('/user/login') && event.status === 200) {
          const { token } = event.body as LoginResponse;
          auth.saveToken(token);
          auth.loginSuccess();
        }
      }
    }),
  );
};
