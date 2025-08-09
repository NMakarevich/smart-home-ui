import { Component, input } from '@angular/core';
import { CardInterface } from '../../interfaces/smart-home-response';
import { Card } from '../card/card';

@Component({
  selector: 'app-tab-content',
  imports: [Card],
  templateUrl: './tab-content.html',
  standalone: true,
  styleUrl: './tab-content.scss',
})
export class TabContent {
  cards = input.required<CardInterface[]>();
}
