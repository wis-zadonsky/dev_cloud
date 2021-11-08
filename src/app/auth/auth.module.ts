import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegistrationComponent } from './components';
import { LoginContainer, RegistrationContainer } from './containers';
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";

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
export class AuthModule { }
