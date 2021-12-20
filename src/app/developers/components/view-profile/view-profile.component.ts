import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

import { ProfileService } from '../../../dashboard';
import { IUserProfile } from '../../../dashboard/interfaces/user-profile.interface';
import { IGithub } from '../../../dashboard/interfaces/github.interface';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnDestroy {

  public userProfile$!: Observable<IUserProfile<string>>;

  private readonly _id: string = this._activatedRoute.snapshot.params.id;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _profileService: ProfileService,
) {
    this.getUserProfile();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getUserProfile(): void {
    this.userProfile$ = this._profileService.getUserProfile(this._id)
      .pipe(
        map((userProfile) => {
          userProfile.githubRepos = this.getUserGithubRepos(userProfile.githubUsername);

          return userProfile;
        }),
      );
  }

  public getUserGithubRepos(githubUsername: string): Observable<IGithub[]> {
    return this._profileService.getUserGithubRepos(githubUsername);
  }

}
