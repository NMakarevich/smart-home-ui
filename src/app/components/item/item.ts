import { Component, inject, input, model } from '@angular/core';
import {
  CardLayoutType,
  ItemInterface,
} from '../../interfaces/smart-home-response';
import { SensorValuePipe } from '../../pipes/sensor-value-pipe';
import { MatIcon } from '@angular/material/icon';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { HighlightDevice } from '../../directives/highlight-device';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toggleDevice } from '../../store/dashboard.actions';

@Component({
  selector: 'app-item',
  imports: [
    SensorValuePipe,
    MatIcon,
    MatSlideToggle,
    HighlightDevice,
    MatIconButton,
    CommonModule,
  ],
  templateUrl: './item.html',
  standalone: true,
  styleUrl: './item.scss',
})
export class Item {
  private readonly store = inject(Store);

  layout = input.required<CardLayoutType>();

  item = model.required<ItemInterface>();

  layoutClass() {
    return this.layout() === 'verticalLayout' ? 'horizontal' : 'vertical';
  }

  toggleDevice(event?: MatSlideToggleChange) {
    if (event)
      this.store.dispatch(
        toggleDevice({ deviceId: this.item().id, state: event.checked }),
      );
    else
      this.store.dispatch(
        toggleDevice({ deviceId: this.item().id, state: !this.item().state }),
      );
  }
}
