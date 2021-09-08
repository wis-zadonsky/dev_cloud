import { Component, OnDestroy } from '@angular/core';

import { mapTo, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthToken } from '@app/core';

import { ISignUp } from '../../interfaces/sign-up.interface';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-create-user-container',
  templateUrl: './create-user.container.html',
})
export class CreateUserContainer implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _usersService: UsersService,
    private readonly _authService: AuthService,
  ) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(formData: ISignUp): void {
    this._usersService
      .signUp(formData)
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
