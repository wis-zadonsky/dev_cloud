import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IAuthToken } from '@app/core';

import { ISignUp } from '../interfaces/sign-up.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private readonly _baseUrl = 'api/users';

  constructor(private readonly _httpClient: HttpClient) { }

  public signUp(formData: ISignUp): Observable<IAuthToken> {
    return this._httpClient.post<IAuthToken>(this._baseUrl, formData);
  }

}
