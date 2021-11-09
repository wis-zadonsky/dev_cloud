import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthToken } from '@app/core';
import { AuthService } from '@app/auth';

import { ISignUp } from '../../interfaces/sign-up.interface';
import { IError } from '../../../shared/interfaces/error.interface';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration.component.html',
})
export class RegistrationContainer implements OnDestroy {

  public errors!: IError[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _authService: AuthService,
  ) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(formData: ISignUp): void {
    this._authService
      .signUp(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => console.log('Success!'),
                 (error: HttpErrorResponse) => this.errors = error.error.errors);
  }

}
