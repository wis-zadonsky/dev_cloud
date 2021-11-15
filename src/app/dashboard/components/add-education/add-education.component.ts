import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IEducation } from '../../interfaces/education.interface';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss'],
})
export class AddEducationComponent implements OnInit, OnDestroy {

  @Output()
  public formSubmit = new EventEmitter<IEducation>();

  public readonly educationForm!: FormGroup;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _formBuilder: FormBuilder) {
    this.educationForm = this._createForm();
  }

  public ngOnInit(): void {
    this._checkboxListener();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private get checkboxControl(): AbstractControl | null {
    return this.educationForm.get('current');
  }

  private get datepickerControl(): AbstractControl | null {
    return this.educationForm.get('to');
  }

  public submit(): void {
    if (this.educationForm.valid) {
      this.formSubmit.emit(this.educationForm.value);
    }
    this.educationForm.markAllAsTouched();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      school: [null, Validators.required],
      degree: [null, Validators.required],
      fieldOfStudy: [null],
      from: [null],
      current: [false],
      to: [null],
      description: [null],
    });
  }

  private _checkboxListener(): void {
    this.checkboxControl?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((status) => {
        if (status) {
          this.datepickerControl?.disable();
        } else {
          this.datepickerControl?.enable();
        }
      });
  }

}
