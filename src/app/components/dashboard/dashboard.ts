import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { TabContent } from '../tab-content/tab-content';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { deleteDashboard, saveTabId } from '../../store/dashboard.actions';
import {
  selectCurrentDashboard,
  selectCurrentTab,
  selectDashboardId,
  selectTabId,
} from '../../store/dashboard.selectors';
import * as DashboardActions from '../../store/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    MatTabsModule,
    RouterLink,
    TabContent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterOutlet,
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dashboardService = inject(DashboardService);

  isEditMode = this.dashboardService.isEditModeStatus;

  activeLink = toSignal(this.store.select(selectTabId));

  dashboardId = toSignal(this.store.select(selectDashboardId));

  currentTab = toSignal(this.store.select(selectCurrentTab));

  dashboard = toSignal(this.store.select(selectCurrentDashboard));

  constructor() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      if (dashboardId) {
        this.store.dispatch(DashboardActions.saveDashboardId({ dashboardId }));
      }
    });
  }

  changeActiveTab(tabId: string) {
    this.store.dispatch(saveTabId({ tabId }));
  }

  enterEditMode() {
    this.dashboardService.enterEditMode();
  }

  closeEditMode() {
    this.dashboardService.closeEditMode();
  }

  deleteDashboard() {
    if (this.dashboardId())
      this.store.dispatch(
        deleteDashboard({ dashboardId: this.dashboardId()! }),
      );
  }
}
