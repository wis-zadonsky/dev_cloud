import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IAuthToken } from '@app/core';

import { IAuth } from '../interfaces/auth.interface';
import { ISignUp } from '../interfaces/sign-up.interface';
import { Environment } from '../../core/models/environment.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public get authToken(): string | null {
    return localStorage.getItem('token');
  }

  public get authStatus(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  private authStatus$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _environment: Environment,
    ) {
    this.authStatus$.next(!!localStorage.getItem('token'));
  }

  public auth(formData: IAuth): Observable<IAuthToken> {
    return this._httpClient.post<IAuthToken>(`${this._environment.baseUrl}auth`, formData)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.authStatus$.next(true);
        }),
      );
  }

  public signUp(formData: ISignUp): Observable<IAuthToken> {
    return this._httpClient.post<IAuthToken>(`${this._environment.baseUrl}users`, formData)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.authStatus$.next(true);
        }),
      );
  }

  public logout(): void {
    this._router.navigate(['auth']);
    this.authStatus$.next(false);
    localStorage.clear();
  }

}
