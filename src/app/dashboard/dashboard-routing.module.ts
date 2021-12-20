import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProfileContainer } from './containers/create-profile/create-profile.container';
import { AddExperienceContainer } from './containers/add-experience/add-experience.container';
import { AddEducationContainer } from './containers/add-education/add-education.container';
import { UserDashboardContainer } from './containers/user-dashboard/user-dashboard.container';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardContainer,
  },
  {
    path: 'create-profile',
    component: CreateProfileContainer,
  },
  {
    path: 'add-experience',
    component: AddExperienceContainer,
  },
  {
    path: 'add-education',
    component: AddEducationContainer,
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts').then((module) => module.PostsModule),
  },
  {
    path: 'developers',
    loadChildren: () => import('../developers').then((module) => module.DevelopersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
