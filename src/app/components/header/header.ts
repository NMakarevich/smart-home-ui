import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'header[appHeader]',
  imports: [MatToolbar],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss',
})
export class Header {}
