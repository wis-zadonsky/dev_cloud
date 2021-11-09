import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { IUser, UserService } from '@app/shared';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {

  public currentUser$!: Observable<IUser>;
  public currentUserProfile$!: Observable<Object>;

  constructor(private readonly _userService: UserService) {
    this.getCurrentUser();
    this.getCurrentUserProfile();
  }

  public getCurrentUser(): void {
    this.currentUser$ = this._userService.getCurrentUser();
  }

  public getCurrentUserProfile(): void {
    this.currentUserProfile$ = this._userService.getCurrentUserProfile();
  }

}
