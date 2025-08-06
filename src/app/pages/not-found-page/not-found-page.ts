import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  standalone: true,
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {}
