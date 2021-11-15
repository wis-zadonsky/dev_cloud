import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IEducation } from '../../interfaces/education.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-add-education-container',
  templateUrl: './add-education.container.html',
})
export class AddEducationContainer implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _profileService: ProfileService,
    ) { }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(formData: IEducation): void {
    this._profileService.addEducation(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this._router.navigate(['/dashboard']));
  }

}
