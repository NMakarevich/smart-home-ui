import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DashboardInterface,
  DashboardsInterface,
} from '../interfaces/smart-home-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getDashboards() {
    return this.http.get<DashboardsInterface[]>('/dashboards');
  }

  getDashboard(dashboardId: string) {
    return this.http.get<DashboardInterface>(`/dashboards/${dashboardId}`);
  }

  addDashboard(dashboard: DashboardsInterface) {
    return this.http.post<DashboardInterface>(`/dashboards`, dashboard, {
      observe: 'response',
    });
  }
}
