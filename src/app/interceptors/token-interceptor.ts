import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  if (req.url.endsWith('/user/login')) return next(req);

  const reqWithHeaders = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${auth.getToken()}`),
  });

  return next(reqWithHeaders);
};
