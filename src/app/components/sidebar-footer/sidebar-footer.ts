import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-footer',
  imports: [AsyncPipe, MatButton, MatIcon],
  templateUrl: './sidebar-footer.html',
  standalone: true,
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  profile$ = this.auth.profile;

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
