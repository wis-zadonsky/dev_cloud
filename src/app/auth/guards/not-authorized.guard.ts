import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@app/auth';

@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this._authService.authToken;

    if (!token) {
      return true;
    }

    this._router.navigate(['dashboard']);

    return false;
  }

}
