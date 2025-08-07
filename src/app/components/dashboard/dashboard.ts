import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  MatTab,
  MatTabGroup,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel,
} from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardInterface, Tab } from '../../interfaces/smart-home-response';
import { Observable, of, switchMap, tap } from 'rxjs';
import { TabContent } from '../tab-content/tab-content';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    MatTabGroup,
    MatTab,
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLink,
    TabContent,
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  links!: string[];

  activeLink!: string;

  dashboardId!: string | null;

  currentTab!: Tab;

  tabs$: Observable<DashboardInterface | null> =
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('dashboardId');
        this.dashboardId = id;
        return id
          ? this.http.get<DashboardInterface>(`/dashboards/${id}`)
          : of(null);
      }),
      tap((dashboard) => {
        if (dashboard) {
          this.links = dashboard.tabs.map((tab) => tab.id);
          this.activeLink = this.links[0];
          this.currentTab = dashboard.tabs.find(
            (tab) => tab.id === this.activeLink,
          )!;
          if (!this.activatedRoute.snapshot.paramMap.get('tabId')) {
            this.router.navigate([
              'dashboard',
              this.activatedRoute.snapshot.paramMap.get('dashboardId'),
              this.activeLink,
            ]);
          }
        }
      }),
    );
}
