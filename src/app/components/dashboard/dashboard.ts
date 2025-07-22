import { Component, input } from '@angular/core';
import { SmartHomeResponse } from '../../interfaces/smart-home-response';
import { AsyncPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../card/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MatTabGroup, MatTab, Card],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  response$ = input.required<Observable<SmartHomeResponse>>();
}
