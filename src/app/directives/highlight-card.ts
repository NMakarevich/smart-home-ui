import { Directive, ElementRef, inject, input, OnChanges } from '@angular/core';
import { CardInterface } from '../interfaces/smart-home-response';

@Directive({
  standalone: true,
  selector: '[appHighlightCard]',
})
export class HighlightCard implements OnChanges {
  appHighlightCard = input<CardInterface>();

  private element = inject(ElementRef);

  ngOnChanges(): void {
    const cardHasSwitchedOnDevices = this.appHighlightCard()?.items.some(
      (item) => item.state,
    );
    if (cardHasSwitchedOnDevices)
      this.element.nativeElement.classList.add('highlight-card');
    else this.element.nativeElement.classList.remove('highlight-card');
  }
}
