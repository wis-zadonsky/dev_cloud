import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { IUserProfile } from '../interfaces/user-profile.interface';
import { Environment } from '../../core/models/environment.model';
import { IExperience } from '../interfaces/experience.interface';
import { IEducation } from '../interfaces/education.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  public createdStatus = new BehaviorSubject<boolean>(false);

  private currentUserProfile$ = new Subject<IUserProfile<string>>();

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _environment: Environment,
    ) { }

  public get userProfile$(): Observable<IUserProfile<string>> {
    return this.currentUserProfile$.asObservable();
  }

  public saveUserProfile(formData: IUserProfile<string>): Observable<Object> {
    return this._httpClient.post(`${this._environment.baseUrl}profile`, formData);
  }

  public getCurrentUserProfile(): Observable<IUserProfile<string>> {
    return this._httpClient.get<IUserProfile<string>>(`${this._environment.baseUrl}profile/me`)
      .pipe(
        map((userProfile) => {
          userProfile.experience = userProfile.experience.map((experience) => {
            if (experience.current) {
              experience.to = 'Now';
            }

            return experience;
          });

          return userProfile;
        }),
      );
  }

  public addExperience(formData: IExperience): Observable<IExperience> {
    return this._httpClient.put<IExperience>(
      `${this._environment.baseUrl}profile/experience`, formData);
  }

  public removeExperience(id: string): Observable<IUserProfile<string>> {
    return this._httpClient.delete<IUserProfile<string>>(
      `${this._environment.baseUrl}profile/experience/${id}`)
      .pipe(
        tap(() => this.currentUserProfile$.next()),
      );
  }

  public addEducation(formData: IEducation): Observable<IEducation> {
    return this._httpClient.put<IEducation>(
      `${this._environment.baseUrl}profile/education`, formData);
  }

  public removeEducation(id: string): Observable<IUserProfile<string>> {
    return this._httpClient.delete<IUserProfile<string>>(
      `${this._environment.baseUrl}profile/education/${id}`)
      .pipe(
        tap(() => this.currentUserProfile$.next()),
      );
  }

}