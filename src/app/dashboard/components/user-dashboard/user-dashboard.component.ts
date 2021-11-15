import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
import { IUserProfile } from '../../interfaces/user-profile.interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {

  @Input('currentUserProfile')
  public currentUserProfile$!: Observable<IUserProfile<string>>;

  @Output()
  public experienceRemove = new EventEmitter<string>();
  @Output()
  public educationRemove = new EventEmitter<string>();

  public createdStatus!: boolean;

  constructor(
    private readonly _profileService: ProfileService,
    ) {
    this.createdStatus = this._profileService.createdStatus.value;
  }

  public removeExperience(id: string): void {
    this.experienceRemove.emit(id);
  }

  public removeEducation(id: string): void {
    this.educationRemove.emit(id);
  }

}
