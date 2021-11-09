import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginContainer, RegistrationContainer } from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginContainer,
  },
  {
    path: 'registration',
    component: RegistrationContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
