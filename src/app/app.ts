import { Component, inject, signal, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Menu } from './components/menu/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarFooter } from './components/sidebar-footer/sidebar-footer';
import { AsyncPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Auth } from './services/auth';
import { DashboardsInterface } from './interfaces/smart-home-response';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatIconButton,
    MatIcon,
    Menu,
    SidebarFooter,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home-ui');
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  dashboards$ = this.http.get<DashboardsInterface[]>('/dashboards').pipe(
    tap((dashboards) => {
      this.router.navigate(['dashboard', dashboards[0].id], {});
    }),
  );

  auth = inject(Auth);

  isAuthorized = this.auth.checkToken();

  sidenav = viewChild(MatSidenav);

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
}
