import { Component } from '@angular/core';
import { MenuModel } from './menu-model';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [MatList, MatListItem, MatIcon],
  templateUrl: './menu.html',
  standalone: true,
  styleUrl: './menu.scss',
})
export class Menu {
  menuList: MenuModel[] = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
    },
    {
      icon: 'info',
      title: 'About',
    },
  ];
}
