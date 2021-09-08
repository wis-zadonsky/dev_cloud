import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ISignUp } from '../../interfaces/sign-up.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {

  @Output()
  public formSubmit = new EventEmitter<ISignUp>();

  public readonly createUserForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.createUserForm = this._createForm();
  }

  public submit(): void {
    this.formSubmit.emit(this.createUserForm.value);
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [
        null,
        [
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.required,
        ],
      ],
      confirmPassword: [null],
    });
  }

}
