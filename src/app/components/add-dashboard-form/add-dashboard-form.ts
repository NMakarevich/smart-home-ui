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
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addDashboard } from '../../store/dashboard.actions';

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
  private subscription!: Subscription;
  private readonly store = inject(Store);

  dashboardForm: FormGroup<DashboardForm> = this.fb.nonNullable.group({
    id: [
      '',
      [Validators.required, Validators.maxLength(30)],
      [uniqueDashboardId()],
    ],
    title: ['', [Validators.required]],
    icon: ['', [Validators.required]],
  });

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
    this.store.dispatch(
      addDashboard({ dashboard: this.dashboardForm.getRawValue() }),
    );
  }

  onClose() {
    this.dialog.closeDialog();
    this.subscription.unsubscribe();
  }
}
