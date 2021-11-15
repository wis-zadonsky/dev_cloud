import { Component, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IUserProfile } from '../../interfaces/user-profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-dashboard-container',
  templateUrl: './user-dashboard.container.html',
})
export class UserDashboardContainer implements OnDestroy {

  public currentUserProfile$!: Observable<IUserProfile<string>>;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _profileService: ProfileService) {
    this.getCurrentUserProfile();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getCurrentUserProfile(): void {
    this.currentUserProfile$ = this._profileService.userProfile$
      .pipe(
        startWith(''),
        switchMap(() => this._profileService.getCurrentUserProfile()),
      );
  }

  public removeExperience(id: string): void {
    this._profileService.removeExperience(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public removeEducation(id: string): void {
    this._profileService.removeEducation(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

}
