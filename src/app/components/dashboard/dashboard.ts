import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardInterface, Tab } from '../../interfaces/smart-home-response';
import { Observable, of, switchMap, tap } from 'rxjs';
import { TabContent } from '../tab-content/tab-content';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MatTabsModule, RouterLink, TabContent],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dashboardService = inject(DashboardService);

  activeLink!: string;

  dashboardId!: string | null;

  currentTab!: Tab;

  tabs$: Observable<DashboardInterface | null> =
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('dashboardId');
        this.dashboardId = id;
        return id ? this.dashboardService.getDashboard(id) : of(null);
      }),
      tap((dashboard) => {
        if (dashboard && dashboard.tabs.length) {
          const links = dashboard.tabs.map((tab) => tab.id);
          this.activeLink =
            this.activatedRoute.snapshot.paramMap.get('tabId') || links[0];
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
