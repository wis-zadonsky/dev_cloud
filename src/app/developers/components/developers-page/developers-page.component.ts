import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@app/auth';

import { ProfileService } from '../../../dashboard';
import { IUserProfile } from '../../../dashboard/interfaces/user-profile.interface';

@Component({
  selector: 'app-developers-page',
  templateUrl: './developers-page.component.html',
  styleUrls: ['./developers-page.component.scss'],
})
export class DevelopersPageComponent {

  public readonly allProfiles$!: Observable<IUserProfile<string>[]>;
  public readonly authStatus$!: Observable<boolean>;

  constructor(
    private readonly _profileService: ProfileService,
    private readonly _authService: AuthService,
    ) {
    this.allProfiles$ = this.getAllProfiles();
    this.authStatus$ = this._authService.authStatus;
  }

  public getAllProfiles(): Observable<IUserProfile<string>[]> {
    return this._profileService.getAllProfiles();
  }

}
