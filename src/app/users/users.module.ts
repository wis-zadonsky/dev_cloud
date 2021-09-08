import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateUserContainer } from './containers/create-user/create-user.container';


@NgModule({
  declarations: [
    CreateUserComponent,
    CreateUserContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
