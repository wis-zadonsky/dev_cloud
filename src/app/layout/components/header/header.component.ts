import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { AuthService } from '@app/auth';
import { UserService, IUser } from '@app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  public currentUser$!: Observable<IUser>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _currentUserService: UserService,
    ) {
  }

  public ngOnInit(): void {
    this._getCurrentUser();
  }

  public getAuthStatus(): Observable<boolean> {
    return this._authService.authStatus;
  }

  public logout(): void {
    this._authService.logout();
  }

  private _getCurrentUser(): void {
    this.currentUser$ = this._currentUserService.currentUser$
      .pipe(
        startWith(''),
        switchMap(() => this._currentUserService.getCurrentUser()),
      );
  }

}
