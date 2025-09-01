import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { AddDashboardForm } from '../add-dashboard-form/add-dashboard-form';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar-footer',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './sidebar-footer.html',
  standalone: true,
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);

  profile = toSignal(this.auth.profile);

  addDashboard() {
    this.dialog.openDialog(AddDashboardForm);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
