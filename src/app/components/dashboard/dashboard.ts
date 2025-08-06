import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../card/card';
import { Observable } from 'rxjs';
import { DashboardInterface } from '../../interfaces/smart-home-response';
import { TabContent } from '../tab-content/tab-content';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MatTabGroup, MatTab, TabContent],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  response$ = input.required<Observable<SmartHomeResponse>>();
}
