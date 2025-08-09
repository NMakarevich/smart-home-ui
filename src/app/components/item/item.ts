import { Component, input, model, output } from '@angular/core';
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
  layout = input.required<CardLayoutType>();

  item = model.required<ItemInterface>();

  toggleDevice = output<boolean>();

  layoutClass() {
    return this.layout() === 'verticalLayout' ? 'horizontal' : 'vertical';
  }

  onToggleDevice(event?: MatSlideToggleChange) {
    if (event) this.item.update((item) => ({ ...item, state: event.checked }));
    else this.item.update((item) => ({ ...item, state: !item.state }));
    this.toggleDevice.emit(this.item().state!);
  }
}
