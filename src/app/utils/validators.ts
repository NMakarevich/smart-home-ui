import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDashboardList } from '../store/dashboard.selectors';

export function uniqueDashboardId(): AsyncValidatorFn {
  const store = inject(Store);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(1000), // why it doesn't work if form updateOn: change?
      switchMap(() =>
        store.select(selectDashboardList).pipe(
          map((dashboards) => {
            if (!dashboards) return null;
            return !!dashboards.find(
              (dashboard) => dashboard.id === control.value,
            )
              ? { uniqueId: { message: 'Id should be unique' } }
              : null;
          }),
          catchError(() => of(null)),
        ),
      ),
    );
  };
}
