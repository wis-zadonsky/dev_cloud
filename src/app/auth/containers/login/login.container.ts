import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { IError } from '@app/shared';

@Component({
  selector: 'app-login-container',
  templateUrl: './login.container.html',
})
export class LoginContainer implements OnDestroy {

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

  public submit(formData: IAuth): void {
    this._authService
      .auth(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this._router.navigate(['dashboard']),
                 (error: HttpErrorResponse) => this.errors = error.error.errors);
  }

}
