import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ISignUp } from '../../interfaces/sign-up.interface';
import { ValidationService } from '../../../core/services/validation.service';
import { IError } from '../../../core/interfaces/error.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {

  @Input()
  public errors!: IError[];

  @Output()
  public formSubmit = new EventEmitter<ISignUp>();

  public readonly createUserForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _validationService: ValidationService,
    ) {
    this.createUserForm = this._createForm();
  }

  public submit(): void {
    if (this.createUserForm.valid) {
      this.formSubmit.emit(this.createUserForm.value);
    }
    this.createUserForm.markAllAsTouched();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, this._validationService.passwordValidation]],
      confirmPassword: [null, Validators.required],
    }, {
      validators:  this._validationService
        .matchPassword('password', 'confirmPassword'),
    });
  }

}
