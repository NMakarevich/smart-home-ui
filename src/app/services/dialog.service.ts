import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openDialog(component: ComponentType<unknown>) {
    this.dialog.open(component);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
