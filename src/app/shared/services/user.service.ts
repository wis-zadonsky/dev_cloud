import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { IUser } from '../interfaces';
import { Environment } from '../../core/models/environment.model';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _currentUser$ = new Subject<IUser>();

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _environment: Environment,
    ) {
  }

  public get currentUser$(): Observable<IUser> {
    return this._currentUser$.asObservable();
  }

  public getCurrentUser(): Observable<IUser> {
    return this._httpClient.get<IUser>(`${this._environment.baseUrl}auth`)
      .pipe(
        tap((userData) => localStorage.setItem('userId', userData._id)),
      );
  }

}
