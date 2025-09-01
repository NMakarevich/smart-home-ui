import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { urlInterceptor } from './interceptors/url-interceptor';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { responseInterceptor } from './interceptors/response-interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardReducer } from './store/dashboard.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as dashboardEffects from './store/dashboard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([urlInterceptor, tokenInterceptor, responseInterceptor]),
    ),
    provideStore(),
    provideState({ name: 'dashboard', reducer: dashboardReducer }),
    provideEffects(dashboardEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
