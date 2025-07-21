import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Header } from './components/header/header';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Menu } from './components/menu/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarFooter } from './components/sidebar-footer/sidebar-footer';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { SmartHomeResponse } from './interfaces/smart-home-response';
import { Card } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    Header,
    MatIconButton,
    MatIcon,
    Menu,
    SidebarFooter,
    AsyncPipe,
    MatTabGroup,
    MatTab,
    Card,
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home-ui');

  sidenav = viewChild(MatSidenav);

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  response$: Observable<SmartHomeResponse>;

  private readonly http = inject(HttpClient);

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.response$ = this.http.get<SmartHomeResponse>('/mock/mock-data.json');
  }
}
