import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDashboardList } from '../store/dashboard.selectors';

export function uniqueDashboardId(): AsyncValidatorFn {
  const store = inject(Store);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return store.select(selectDashboardList).pipe(
      map((dashboards) => {
        if (!dashboards) return null;
        const dashboardIdIsUnique = !dashboards.find(
          (dashboard) => dashboard.id === control.value,
        );
        return dashboardIdIsUnique
          ? null
          : { uniqueId: { message: 'Id should be unique' } };
      }),
      take(1),
    );
  };
}
