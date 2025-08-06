import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-footer',
  imports: [AsyncPipe],
  templateUrl: './sidebar-footer.html',
  standalone: true,
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  private readonly auth = inject(Auth);

  profile$ = this.auth.profile;
}
