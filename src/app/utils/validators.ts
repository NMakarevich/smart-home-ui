import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { DashboardsInterface } from '../interfaces/smart-home-response';
import { DashboardService } from '../services/dashboard.service';

export function uniqueDashboardId(): AsyncValidatorFn {
  const dashboardService = inject(DashboardService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(1000), // why it doesn't work if form updateOn: change?
      switchMap((id) =>
        dashboardService.getDashboards().pipe(
          map((dashboards: DashboardsInterface[]) => {
            return !!dashboards.find((dashboard) => dashboard.id === id)
              ? { uniqueId: { message: 'Id should be unique' } }
              : null;
          }),
          catchError(() => of(null)),
        ),
      ),
    );
  };
}
