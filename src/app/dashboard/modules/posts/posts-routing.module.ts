import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsPageContainer } from './containers/posts-page/posts-page.container';
import { ViewPostContainer } from './containers/view-post/view-post.container';

const routes: Routes = [
  {
    path: '',
    component: PostsPageContainer,
  },
  {
    path: ':id',
    component: ViewPostContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
