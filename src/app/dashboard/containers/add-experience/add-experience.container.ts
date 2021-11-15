import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IExperience } from '../../interfaces/experience.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-add-experience-container',
  templateUrl: './add-experience.container.html',
})
export class AddExperienceContainer implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _profileService: ProfileService,
    ) { }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(formData: IExperience): void {
    this._profileService.addExperience(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this._router.navigate(['/dashboard']));
  }

}
