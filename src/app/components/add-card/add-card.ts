import { Component, inject } from '@angular/core';
import { CardLayoutType } from '../../interfaces/smart-home-response';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-add-card',
  imports: [MatButtonModule],
  templateUrl: './add-card.html',
  standalone: true,
  styleUrl: './add-card.scss',
})
export class AddCard {
  readonly cardLayoutTypes: { type: CardLayoutType; label: string }[] = [
    { type: 'horizontalLayout', label: 'Horizontal Layout' },
    { type: 'verticalLayout', label: 'Vertical Layout' },
    { type: 'singleDevice', label: 'Single Device Layout' },
  ];

  private readonly dialogService = inject(DialogService);

  addCard(type: CardLayoutType) {
    console.log(type);
    this.dialogService.closeDialog();
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }
}
