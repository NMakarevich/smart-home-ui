import { Component, inject } from '@angular/core';
import { Card } from '../card/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog.service';
import { AddCard } from '../add-card/add-card';
import { DashboardService } from '../../services/dashboard.service';
import { Store } from '@ngrx/store';
import { selectCards } from '../../store/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tab-content',
  imports: [Card, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './tab-content.html',
  standalone: true,
  styleUrl: './tab-content.scss',
})
export class TabContent {
  private readonly store = inject(Store);

  cards = toSignal(this.store.select(selectCards));

  private readonly dialogService = inject(DialogService);
  private readonly dashboardService = inject(DashboardService);

  isEditMode = this.dashboardService.isEditModeStatus;

  addCard() {
    this.dialogService.openDialog(AddCard);
  }
}
