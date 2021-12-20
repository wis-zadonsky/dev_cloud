import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home').then((module) => module.HomeModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth').then((module) => module.AuthModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard').then((module) => module.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'developers',
    loadChildren: () => import('./developers').then((module) => module.DevelopersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
