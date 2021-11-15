import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IExperience } from '../../interfaces/experience.interface';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss'],
})
export class AddExperienceComponent implements OnInit, OnDestroy {

  @Output()
  public formSubmit = new EventEmitter<IExperience>();

  public readonly experienceForm!: FormGroup;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _formBuilder: FormBuilder) {
    this.experienceForm = this._createForm();
  }

  public ngOnInit(): void {
    this._checkboxListener();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public get checkboxControl(): AbstractControl | null {
    return this.experienceForm.get('current');
  }

  public get dateControl(): AbstractControl | null {
    return this.experienceForm.get('to');
  }

  public submit(): void {
    if (this.experienceForm.valid) {
      this.formSubmit.emit(this.experienceForm.value);
    }
    this.experienceForm.markAllAsTouched();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      title: [null, Validators.required],
      company: [null, Validators.required],
      location: [null],
      from: [null, Validators.required],
      current: [null],
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
          this.dateControl?.disable();
        } else {
          this.dateControl?.enable();
        }
      });
  }

}
