import {
  DashboardInterface,
  DashboardsInterface,
} from '../interfaces/smart-home-response';
import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';

export interface DashboardState {
  dashboardList: DashboardsInterface[] | null;
  currentDashboard: DashboardInterface | null;
  dashboardId: string | null;
  tabId: string | null;
}

const initialState: DashboardState = {
  dashboardList: null,
  currentDashboard: null,
  dashboardId: null,
  tabId: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.saveDashboards, (state, payload) => ({
    ...state,
    dashboardList: payload.dashboards,
  })),
  on(DashboardActions.saveCurrentDashboard, (state, payload) => ({
    ...state,
    currentDashboard: payload.dashboard,
  })),
  on(DashboardActions.saveDashboardId, (state, payload) => ({
    ...state,
    dashboardId: payload.dashboardId,
  })),
  on(DashboardActions.saveTabId, (state, payload) => ({
    ...state,
    tabId: payload.tabId,
  })),
  on(DashboardActions.addDashboardSuccessful, (state, payload) => {
    if (state.dashboardList) {
      return {
        ...state,
        dashboardList: [...state.dashboardList, payload.dashboard],
      };
    } else return { ...state, dashboardList: [payload.dashboard] };
  }),
  on(DashboardActions.deleteDashboardSuccessful, (state, payload) => ({
    ...state,
    currentDashboard: null,
    tabId: null,
    dashboardId:
      state.dashboardList!.length > 1 ? state.dashboardList![0].id : null,
    dashboardList: state.dashboardList!.filter(
      (dashboard) => dashboard.id !== payload.dashboardId,
    ),
  })),
);
