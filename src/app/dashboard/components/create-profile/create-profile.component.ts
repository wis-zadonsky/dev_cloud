import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUserProfile } from '../../interfaces/user-profile.interface';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProfileComponent implements OnChanges {

  @Input('currentUserProfile')
  public currentUserProfile!: IUserProfile<string> | null;

  @Input('successMessage')
  public successMessage!: string;

  @Output()
  public formSubmit = new EventEmitter<IUserProfile<string>>();

  @Output()
  public formUpdate = new EventEmitter<IUserProfile<string>>();

  public readonly userProfileForm!: FormGroup;

  public toggleSocialMedia = false;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.userProfileForm = this._createForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentUserProfile?.currentValue) {
      this._patchForm();
    }
  }

  public toggle(): void {
    this.toggleSocialMedia = !this.toggleSocialMedia;
  }

  public submit(): void {
    if (this.userProfileForm.valid) {
      if (this.currentUserProfile === null) {
        this.formSubmit.emit(this.userProfileForm.value);
      }
      this.formUpdate.emit(this.userProfileForm.value);
    }
    this.userProfileForm.markAllAsTouched();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      status: [0, Validators.required],
      company: [null],
      website: [null],
      location: [null],
      skills: [null, Validators.required],
      githubUsername: [null],
      bio: [null],
      twitter: [null],
      facebook: [null],
      youtube: [null],
      vk: [null],
      instagram: [null],
    });
  }

  private _patchForm(): void {
    this.userProfileForm.patchValue({
      status: this.currentUserProfile?.status,
      company: this.currentUserProfile?.company,
      website: this.currentUserProfile?.website,
      location: this.currentUserProfile?.location,
      skills: this.currentUserProfile?.skills,
      githubUsername: this.currentUserProfile?.githubUsername,
      bio: this.currentUserProfile?.bio,
      twitter: this.currentUserProfile?.social?.twitter,
      facebook: this.currentUserProfile?.social?.facebook,
      youtube: this.currentUserProfile?.social?.youtube,
      vk: this.currentUserProfile?.social?.vk,
      instagram: this.currentUserProfile?.social?.instagram,
    });
  }

}
