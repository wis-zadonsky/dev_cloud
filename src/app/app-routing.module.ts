import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home').then((module) => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth').then((module) => module.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users').then((module) => module.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
