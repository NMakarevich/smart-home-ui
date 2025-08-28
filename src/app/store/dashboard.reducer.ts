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
  on(DashboardActions.toggleDevice, (state, payload) => {
    const { deviceId } = payload;
    const tabIndex = state.currentDashboard!.tabs.findIndex(
      (tab) => tab.id === state.tabId,
    );
    const cardIndex = state.currentDashboard!.tabs[tabIndex].cards.findIndex(
      (card) => card.items.map((item) => item.id).includes(deviceId),
    );
    const itemIndex = state.currentDashboard!.tabs[tabIndex].cards[
      cardIndex
    ].items.findIndex((item) => item.id === deviceId);
    return {
      ...state,
      currentDashboard: {
        ...state.currentDashboard,
        tabs: [
          ...state.currentDashboard!.tabs.slice(0, tabIndex),
          {
            ...state.currentDashboard!.tabs[tabIndex],
            cards: [
              ...state.currentDashboard!.tabs[tabIndex].cards.slice(
                0,
                cardIndex,
              ),
              {
                ...state.currentDashboard!.tabs[tabIndex].cards[cardIndex],
                items: [
                  ...state.currentDashboard!.tabs[tabIndex].cards[
                    cardIndex
                  ].items.slice(0, itemIndex),
                  {
                    ...state.currentDashboard!.tabs[tabIndex].cards[cardIndex]
                      .items[itemIndex],
                    state: payload.state,
                  },
                  ...state.currentDashboard!.tabs[tabIndex].cards[
                    cardIndex
                  ].items.slice(itemIndex + 1),
                ],
              },
              ...state.currentDashboard!.tabs[tabIndex].cards.slice(
                cardIndex + 1,
              ),
            ],
          },
          ...state.currentDashboard!.tabs.slice(tabIndex + 1),
        ],
      },
    };
  }),
);
