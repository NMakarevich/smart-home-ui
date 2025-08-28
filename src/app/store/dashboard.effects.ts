import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as DashboardActions from './dashboard.actions';
import { concatMap, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectDashboardId,
  selectDashboardList,
  selectIds,
} from './dashboard.selectors';
import { DialogService } from '../services/dialog.service';
import { DeviceService } from '../services/device.service';

export const loadDashboardList = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService = inject(DashboardService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      switchMap(() => store.select(selectDashboardList)),
      switchMap((dashboardList) => {
        if (!dashboardList)
          return dashboardService
            .getDashboards()
            .pipe(
              map((dashboardList) =>
                DashboardActions.saveDashboards({ dashboards: dashboardList }),
              ),
            );
        else
          return of(
            DashboardActions.saveDashboards({ dashboards: dashboardList }),
          );
      }),
    );
  },
  { functional: true },
);

export const saveDashboards = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(DashboardActions.saveDashboards),
      switchMap(({ dashboards }) =>
        store.select(selectDashboardId).pipe(
          map((dashboardId) => {
            if (dashboardId) return DashboardActions.loadTabs({ dashboardId });
            else
              return DashboardActions.loadTabs({
                dashboardId: dashboards[0].id,
              });
          }),
        ),
      ),
    ),
  { functional: true },
);

export const loadTabs = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) =>
    actions$.pipe(
      ofType(DashboardActions.loadTabs),
      concatMap(({ dashboardId }) =>
        dashboardService.getDashboard(dashboardId).pipe(
          map((dashboard) => {
            return DashboardActions.saveCurrentDashboard({ dashboard });
          }),
        ),
      ),
    ),
  { functional: true },
);

export const setTab = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(DashboardActions.saveCurrentDashboard),
      switchMap(({ dashboard }) =>
        store.select(selectIds).pipe(
          tap(({ dashboardId, tabId }) => {
            if (dashboardId && tabId) {
              router.navigate([
                '/dashboard',
                dashboardId,
                dashboard.tabs[0].id,
              ]);
            }
          }),
        ),
      ),
    ),
  { functional: true, dispatch: false },
);

export const deleteDashboard = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) =>
    actions$.pipe(
      ofType(DashboardActions.deleteDashboard),
      switchMap(({ dashboardId }) =>
        dashboardService.deleteDashboard(dashboardId).pipe(
          map((response) => {
            if (response.ok)
              return DashboardActions.deleteDashboardSuccessful({
                dashboardId,
              });
            else return DashboardActions.deleteDashboardError();
          }),
        ),
      ),
    ),
  { functional: true },
);

export const addDashboard = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) =>
    actions$.pipe(
      ofType(DashboardActions.addDashboard),
      switchMap(({ dashboard }) =>
        dashboardService.addDashboard(dashboard).pipe(
          map((response) => {
            if (response.ok)
              return DashboardActions.addDashboardSuccessful({ dashboard });
            else return DashboardActions.addDashboardError;
          }),
        ),
      ),
    ),
  { functional: true },
);

export const addDashboardSuccessful = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    dialog = inject(DialogService),
  ) =>
    actions$.pipe(
      ofType(DashboardActions.addDashboardSuccessful),
      tap(({ dashboard }) => {
        dialog.closeDialog();
        router.navigate(['dashboard', dashboard.id]);
      }),
    ),
  { functional: true, dispatch: false },
);

export const deleteDashboardSuccessful = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    router = inject(Router),
  ) =>
    actions$.pipe(
      ofType(DashboardActions.deleteDashboardSuccessful),
      switchMap(() => store.select(selectDashboardList)),
      tap((dashboardList) => {
        if (dashboardList && dashboardList.length) {
          router.navigate(['dashboard', dashboardList[0].id]);
        }
      }),
    ),
  { functional: true, dispatch: false },
);

export const toggleDevice = createEffect(
  (actions$ = inject(Actions), deviceService = inject(DeviceService)) =>
    actions$.pipe(
      ofType(DashboardActions.toggleDevice),
      switchMap(({ deviceId, state }) =>
        deviceService.toggleDevice(deviceId, state).pipe(
          map((response) => {
            if (response.ok) return DashboardActions.toggleDeviceSuccessful();
            else
              return DashboardActions.toggleDevice({
                deviceId,
                state: !state,
              });
          }),
        ),
      ),
    ),
  { functional: true },
);
