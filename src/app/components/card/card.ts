import { Component, computed, inject, model } from '@angular/core';
import { CardInterface } from '../../interfaces/smart-home-response';
import { MatCardModule } from '@angular/material/card';
import { CardLayout } from '../../directives/card-layout';
import { Item } from '../item/item';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { HighlightCard } from '../../directives/highlight-card';
import { Store } from '@ngrx/store';
import { toggleDevice } from '../../store/dashboard.actions';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, CardLayout, Item, MatSlideToggle, HighlightCard],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
})
export class Card {
  private readonly store = inject(Store);

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
    this.card().items.forEach((item) => {
      if (item.type === 'device')
        this.store.dispatch(
          toggleDevice({ deviceId: item.id, state: event.checked }),
        );
    });
  }
}
