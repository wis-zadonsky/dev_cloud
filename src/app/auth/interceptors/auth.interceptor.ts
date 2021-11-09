import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '@app/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly _authService: AuthService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
    const token = this._authService.authToken;

    if (token) {
      const updatedRequest = request.clone({
        headers: request.headers.set('x-auth-token', `${token}`),
      });

      return next.handle(updatedRequest);
    }

    return next.handle(request);
  }

}
