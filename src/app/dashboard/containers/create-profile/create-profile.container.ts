import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUserProfile } from '../../interfaces/user-profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-create-profile-container',
  templateUrl: './create-profile.container.html',
})
export class CreateProfileContainer implements OnDestroy {

  public currentUserProfile$!: Observable<IUserProfile<string>>;
  public successMessage!: string;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _profileService: ProfileService,
    ) {
    this.getUserProfile();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getUserProfile(): void {
    this.currentUserProfile$ = this._profileService.getCurrentUserProfile();
  }

  public createProfile(formData: IUserProfile<string>): void {
    this._profileService.saveUserProfile(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._router.navigate(['/dashboard']);
        this._profileService.createdStatus.next(true);
      });
  }

  public updateProfile(formData: IUserProfile<string>): void {
    this._profileService.saveUserProfile(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.successMessage = 'Profile has been updated';
        window.scrollTo(0, 0);
        this._profileService.createdStatus.next(false);
      });
  }

}
