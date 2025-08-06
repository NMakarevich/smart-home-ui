import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardInterface } from '../../interfaces/smart-home-response';
import { Observable, switchMap, tap } from 'rxjs';
import { TabContent } from '../tab-content/tab-content';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MatTabGroup, MatTab, TabContent],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  tabs$: Observable<DashboardInterface> = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('dashboardId');
      return this.http.get<DashboardInterface>(`/dashboards/${id}`);
    }),
  );
}
