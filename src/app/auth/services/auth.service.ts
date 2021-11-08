import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IAuthToken } from '@app/core';

import { IAuth } from '../interfaces/auth.interface';
import { ISignUp } from '../interfaces/sign-up.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public get authStatus(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  private authStatus$ = new BehaviorSubject<boolean>(false);

  private readonly _environment = environment;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
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
