import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersPageComponent } from './components/developers-page/developers-page.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';


@NgModule({
  declarations: [
    DevelopersPageComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule
  ]
})
export class DevelopersModule { }
