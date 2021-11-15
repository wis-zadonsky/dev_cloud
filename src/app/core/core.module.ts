import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from '@app/auth';

import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { environment } from '../../environments/environment';

import { Environment } from './models/environment.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: Environment,
      useValue: environment,
    },
    AuthService,
  ],
})
export class CoreModule { }
