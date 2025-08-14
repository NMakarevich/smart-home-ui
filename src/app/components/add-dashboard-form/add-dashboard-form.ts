import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../services/dialog.service';
import { uniqueDashboardId } from '../../utils/validators';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface DashboardForm {
  id: FormControl<string>;
  title: FormControl<string>;
  icon: FormControl<string>;
}

@Component({
  selector: 'app-add-dashboard-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-dashboard-form.html',
  standalone: true,
  styleUrl: './add-dashboard-form.scss',
})
export class AddDashboardForm {
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(DialogService);
  private readonly dashboardService = inject(DashboardService);
  private readonly router = inject(Router);
  private subscription!: Subscription;

  dashboardForm: FormGroup<DashboardForm> = this.fb.nonNullable.group(
    {
      id: [
        '',
        [Validators.required, Validators.maxLength(30)],
        [uniqueDashboardId()],
      ],
      title: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
    },
  );

  get id() {
    return this.dashboardForm.get('id');
  }

  get title() {
    return this.dashboardForm.get('title');
  }

  get icon() {
    return this.dashboardForm.get('icon');
  }

  onSubmit() {
    this.subscription = this.dashboardService
      .addDashboard(this.dashboardForm.getRawValue())
      .subscribe((response) => {
        if (response.ok) {
          this.dialog.closeDialog();
          this.router.navigate(['dashboard', this.id?.value]);
        }
      });
  }

  onClose() {
    this.dialog.closeDialog();
    this.subscription.unsubscribe();
  }
}
