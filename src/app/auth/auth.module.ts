import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '@app/shared';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegistrationComponent } from './components';
import { LoginContainer, RegistrationContainer } from './containers';

@NgModule({
  declarations: [
    LoginComponent, RegistrationComponent,
    LoginContainer, RegistrationContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    MatFormFieldModule,
  ],
})
export class AuthModule {}

