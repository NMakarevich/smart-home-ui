import { Component, input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { DashboardsInterface } from '../../interfaces/smart-home-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [MatList, MatListItem, MatIcon, RouterLink],
  templateUrl: './menu.html',
  standalone: true,
  styleUrl: './menu.scss',
})
export class Menu {
  dashboards = input.required<DashboardsInterface[]>();
}
