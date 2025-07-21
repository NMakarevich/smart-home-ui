import { Component, computed, model } from '@angular/core';
import {
  CardInterface,
  ItemInterface,
} from '../../interfaces/smart-home-response';
import { MatCardModule } from '@angular/material/card';
import { CardLayout } from '../../directives/card-layout';
import { Item } from '../item/item';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { HighlightCard } from '../../directives/highlight-card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, CardLayout, Item, MatSlideToggle, HighlightCard],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
})
export class Card {
  card = model.required<CardInterface>();

  deviceCount = computed(
    () => this.card().items.filter((item) => item.type === 'device').length,
  );

  hasSwitchedOnDevices = computed(() => {
    return this.card().items.some(
      (item) => item.type === 'device' && item.state,
    );
  });

  toggleDevices(event: MatSlideToggleChange) {
    this.card.update((card) => ({
      ...card,
      items: card.items.map((item) =>
        item.type === 'device' ? { ...item, state: event.checked } : item,
      ),
    }));
  }

  onToggleDevice(event: ItemInterface) {
    this.card.update((card) => ({
      ...card,
      items: card.items.map((item) =>
        item.label === event.label ? { ...item, state: !event.state } : item,
      ),
    }));
  }
}
