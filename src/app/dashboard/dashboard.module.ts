import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '@app/shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateProfileContainer } from './containers/create-profile/create-profile.container';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { AddExperienceContainer } from './containers/add-experience/add-experience.container';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { AddEducationContainer } from './containers/add-education/add-education.container';
import { UserDashboardContainer } from './containers/user-dashboard/user-dashboard.container';


@NgModule({
  declarations: [
    UserDashboardComponent,
    CreateProfileComponent,
    CreateProfileContainer,
    AddExperienceComponent,
    AddExperienceContainer,
    AddEducationComponent,
    AddEducationContainer,
    UserDashboardContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    SharedModule,
  ],
})
export class DashboardModule { }
