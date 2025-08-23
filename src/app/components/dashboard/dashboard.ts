import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
} from '../../store/dashboard.selectors';
import * as DashboardActions from '../../store/dashboard.actions';

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
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);

  isEditMode = signal(false);

  activeLink!: string;

  dashboardId!: string | null;

  currentTab$ = this.store.select(selectCurrentTab);

  tabs$ = this.store.select(selectCurrentDashboard);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      const tabId = params.get('tabId');
      if (dashboardId) {
        this.dashboardId = dashboardId;
        this.store.dispatch(DashboardActions.saveDashboardId({ dashboardId }));
      }
      if (tabId) {
        this.activeLink = tabId;
        this.store.dispatch(DashboardActions.saveTabId({ tabId }));
      }
    });
    this.store.dispatch(DashboardActions.loadDashboards());
  }

  changeActiveTab(tabId: string) {
    this.store.dispatch(saveTabId({ tabId }));
    this.activeLink = tabId;
  }

  enterEditMode() {
    this.isEditMode.set(true);
  }

  closeEditMode() {
    this.isEditMode.set(false);
  }

  deleteDashboard() {
    if (this.dashboardId)
      this.store.dispatch(deleteDashboard({ dashboardId: this.dashboardId }));
  }
}
