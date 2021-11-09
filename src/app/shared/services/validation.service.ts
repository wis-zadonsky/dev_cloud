import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  constructor() { }

  public passwordValidation(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const hasNumber = /\d/.test(control.value);
      const hasUpper = /[A-Z]/.test(control.value);
      const hasLower = /[a-z]/.test(control.value);
      const hasEightLetters = /.{8,}/.test(control.value);

      const valid = hasNumber && hasUpper && hasLower && hasEightLetters;

      if (!valid) {
        return { passwordPatternError: true };
      }
    }

    return null;
  }

  public matchPassword(passwordFieldName: string, confirmPasswordFieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordFieldName);
      const confirmPassword = control.get(confirmPasswordFieldName);

      if (password?.value !== confirmPassword?.value) {
        const errors = {
          ...confirmPassword?.errors,
          passwordMismatch: true,
        };

        confirmPassword?.setErrors(errors);
      } else {
        const allErrors = {
          ...confirmPassword?.errors,
        };

        delete allErrors?.passwordMismatch;

        const errors = Object.values(allErrors).length === 0 ? null : allErrors;

        confirmPassword?.setErrors(errors);
      }

      return null;
    };
  }

}
