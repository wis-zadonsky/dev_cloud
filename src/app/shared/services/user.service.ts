import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _currentUser$ = new BehaviorSubject<IUser | null>(null);

  // FIXME Create provider in core module and inject it in services
  private readonly _environment = environment;

  constructor(private readonly _httpClient: HttpClient) {
  }

  public get currentUser$(): Observable<IUser | null> {
    return this._currentUser$.asObservable();
  }

  public getCurrentUser(): Observable<IUser> {
    return this._httpClient.get<IUser>(`${this._environment.baseUrl}auth`)
      .pipe(
        tap((user) => this._currentUser$.next(user)),
      );
  }

  public getCurrentUserProfile(): Observable<Object> {
    return this._httpClient.get(`${this._environment.baseUrl}profile/me`);
  }

}
