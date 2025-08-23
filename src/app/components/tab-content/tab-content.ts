import { Component, inject, input } from '@angular/core';
import { CardInterface } from '../../interfaces/smart-home-response';
import { Card } from '../card/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog.service';
import { AddCard } from '../add-card/add-card';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-tab-content',
  imports: [Card, MatButtonModule, MatIconModule],
  templateUrl: './tab-content.html',
  standalone: true,
  styleUrl: './tab-content.scss',
})
export class TabContent {
  cards = input.required<CardInterface[]>();

  private readonly dialogService = inject(DialogService);
  private readonly dashboardService = inject(DashboardService);

  isEditMode = this.dashboardService.isEditModeStatus;

  addCard() {
    this.dialogService.openDialog(AddCard);
  }
}
