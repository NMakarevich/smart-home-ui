import { createAction, props } from '@ngrx/store';
import {
  DashboardInterface,
  DashboardsInterface,
} from '../interfaces/smart-home-response';

export const loadDashboardsList = createAction(
  '[Dashboard] Load Dashboards list',
);
export const saveDashboardsList = createAction(
  '[Dashboard] Save Dashboards list',
  props<{ dashboards: DashboardsInterface[] }>(),
);
export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ dashboardId: string }>(),
);
export const saveCurrentDashboard = createAction(
  '[Dashboard] Save Current Dashboard',
  props<{ dashboard: DashboardInterface }>(),
);
export const saveDashboardId = createAction(
  '[Dashboard] Save Current DashboardId',
  props<{ dashboardId: string | null }>(),
);
export const setDefaultDashboardId = createAction(
  '[Dashboard] Set Default DashboardId',
);
export const saveTabId = createAction(
  '[Dashboard] Save Current Tab id',
  props<{ tabId: string | null }>(),
);
export const addDashboard = createAction(
  '[Dashboard] Add Dashboard',
  props<{ dashboard: DashboardsInterface }>(),
);
export const addDashboardSuccessful = createAction(
  '[Dashboard] Add Dashboard successful',
  props<{ dashboard: DashboardsInterface }>(),
);
export const addDashboardError = createAction(
  '[Dashboard] Add Dashboard error',
);
export const deleteDashboard = createAction(
  '[Dashboard] Delete Dashboard',
  props<{ dashboardId: string }>(),
);
export const deleteDashboardSuccessful = createAction(
  '[Dashboard] Delete Dashboard successful',
  props<{ dashboardId: string }>(),
);
export const deleteDashboardError = createAction(
  '[Dashboard] Delete Dashboard error',
);
export const toggleDevice = createAction(
  '[Device] Toggle Device',
  props<{ deviceId: string; state: boolean }>(),
);
export const toggleDeviceSuccessful = createAction(
  '[Device] Toggle Device Successful',
);
