import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Menu } from './components/menu/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarFooter } from './components/sidebar-footer/sidebar-footer';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';
import { Store } from '@ngrx/store';
import { selectDashboardList } from './store/dashboard.selectors';
import * as DashboardActions from './store/dashboard.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIcon,
    Menu,
    SidebarFooter,
    CommonModule,
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home-ui');
  private readonly store = inject(Store);
  private readonly auth = inject(Auth);

  dashboards = toSignal(this.store.select(selectDashboardList));
  isAuthorized = toSignal(this.auth.authStatus);

  sidenav = viewChild(MatSidenav);

  readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    this.store.dispatch(DashboardActions.loadDashboardsList());
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
}
