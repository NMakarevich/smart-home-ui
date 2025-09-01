import { Directive, ElementRef, inject, input, OnChanges } from '@angular/core';
import { ItemInterface } from '../interfaces/smart-home-response';

@Directive({
  standalone: true,
  selector: '[appHighlightDevice]',
})
export class HighlightDevice implements OnChanges {
  appHighlightDevice = input<ItemInterface>();
  private element = inject(ElementRef);

  ngOnChanges() {
    if (this.appHighlightDevice()?.state)
      this.element.nativeElement.classList.add('highlight-device');
    else this.element.nativeElement.classList.remove('highlight-device');
  }
}
