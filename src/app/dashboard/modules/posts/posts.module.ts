import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostsPageContainer } from './containers/posts-page/posts-page.container';
import {SharedModule} from "@app/shared";
import { ViewPostComponent } from './components/view-post/view-post.component';
import { ViewPostContainer } from './containers/view-post/view-post.container';

@NgModule({
  declarations: [
    PostsPageComponent,
    PostsPageContainer,
    ViewPostComponent,
    ViewPostContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    MatFormFieldModule,
    SharedModule,
  ],
})
export class PostsModule { }
