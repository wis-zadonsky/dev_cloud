import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { ProfileService } from 'app/dashboard/services/profile.service';
import { IReport } from 'app/dashboard/interfaces/report.interface';
import { UserService } from '@app/shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnDestroy {

  public readonly reportForm!: FormGroup;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _profileService: ProfileService,
    private readonly _userService: UserService,
  ) {
    this.reportForm = this._createForm();
    this._userService.getCurrentUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe((user) => this.reportForm.get('userName')?.patchValue(user.name));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public saveReport(): void {
    if (this.reportForm.valid) {
      this._createReport(this.reportForm.value);
      return;
    }
    this.reportForm.markAsTouched();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      userName: [null],
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(100)]],
    })
  }

  private _createReport(formData: IReport): void {
    this._profileService.createReport(formData)
      .subscribe()
  }

}
