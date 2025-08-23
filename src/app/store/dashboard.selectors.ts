import { DashboardState } from './dashboard.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard');

export const selectDashboardList = createSelector(
  selectDashboardState,
  (dashboard: DashboardState) => dashboard.dashboardList,
);

export const selectCurrentDashboard = createSelector(
  selectDashboardState,
  (dashboard: DashboardState) => dashboard.currentDashboard,
);

export const selectDashboardId = createSelector(
  selectDashboardState,
  (dashboard) => dashboard.dashboardId,
);

export const selectTabId = createSelector(
  selectDashboardState,
  (dashboard: DashboardState) => dashboard.tabId,
);

export const selectIds = createSelector(
  selectDashboardState,
  ({ dashboardId, tabId }) => ({ dashboardId, tabId }),
);

export const selectCurrentTab = createSelector(
  selectDashboardState,
  (dashboard: DashboardState) => {
    return dashboard.currentDashboard?.tabs.find(
      (tab) => tab.id === dashboard.tabId,
    );
  },
);
