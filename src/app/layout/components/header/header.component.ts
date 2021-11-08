import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(private readonly _authService: AuthService) { }

  public getAuthStatus(): Observable<boolean> {
    return this._authService.authStatus;
  }

  public logout(): void {
    this._authService.logout();
  }

}
