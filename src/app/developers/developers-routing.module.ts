import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevelopersPageComponent } from './components/developers-page/developers-page.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DevelopersPageComponent,
  },
  {
    path: ':id',
    component: ViewProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopersRoutingModule { }
