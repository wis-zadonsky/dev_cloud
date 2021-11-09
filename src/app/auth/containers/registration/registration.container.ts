import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IError } from '@app/shared';

import { AuthService } from '../../services/auth.service';
import { ISignUp } from '../../interfaces/sign-up.interface';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration.component.html',
})
export class RegistrationContainer implements OnDestroy {

  public errors!: IError[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
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
      .subscribe(() => this._router.navigate(['dashboard']),
                 (error: HttpErrorResponse) => this.errors = error.error.errors);
  }

}
