import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';

import { IAuthToken } from '@app/core';

import { IAuth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public authStatus$ = new BehaviorSubject(false);

  private readonly _baseUrl = 'api/auth';

  constructor(private readonly _httpClient: HttpClient) { }

  public auth(formData: IAuth): Observable<IAuthToken> {
    return this._httpClient.post<IAuthToken>(this._baseUrl, formData);
  }

}
