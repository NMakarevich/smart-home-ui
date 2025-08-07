import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardInterface } from '../../interfaces/smart-home-response';
import { Observable, of, switchMap } from 'rxjs';
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

  tabs$: Observable<DashboardInterface | null> =
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('dashboardId');
        return id
          ? this.http.get<DashboardInterface>(`/dashboards/${id}`)
          : of(null);
      }),
    );
}
