import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsPageComponent } from './components/posts-page/posts-page.component';

const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
