import { HttpInterceptorFn } from '@angular/common/http';
import { BASE_URL } from '../../environment/environment.dev';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithFullURL = req.clone({
    url: `${BASE_URL}${req.url}`,
  });
  return next(reqWithFullURL);
};
