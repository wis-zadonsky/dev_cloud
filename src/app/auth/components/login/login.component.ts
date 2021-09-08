import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IAuth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  @Output()
  public formSubmit = new EventEmitter<IAuth>();

  public readonly authForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.authForm = this._createForm();
  }

  public submit(): void {
    this.formSubmit.emit(this.authForm.value);
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

}
