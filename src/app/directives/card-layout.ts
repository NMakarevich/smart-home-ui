import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { CardLayoutType } from '../interfaces/smart-home-response';

@Directive({
  standalone: true,
  selector: '[appCardLayout]',
})
export class CardLayout implements OnInit {
  private element = inject(ElementRef);

  appCardLayout = input.required<CardLayoutType>();

  ngOnInit() {
    this.element.nativeElement.classList.add(this.appCardLayout());
  }
}
