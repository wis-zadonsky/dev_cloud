import { Component, OnDestroy } from '@angular/core';

import { map, mapTo, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthToken } from '@app/core';

import { IAuth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login.container.html',
})
export class LoginContainer implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _authService: AuthService) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(formData: IAuth): void {
    this._authService
      .auth(formData)
      .pipe(
        map((response: IAuthToken) => {
          localStorage.setItem('token', response.token);
        }),
        mapTo(true),
        takeUntil(this._destroy$),
      )
      .subscribe((value: boolean) => this._authService.authStatus$.next(value));
  }

}
