import { Component, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IPostForm } from '../../interfaces/post-form.interface';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts-page-container',
  templateUrl: './posts-page.container.html',
})
export class PostsPageContainer implements OnDestroy {

  public allPosts$!: Observable<IPost<string>[]>;

  public responseMessage!: string;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _postService: PostService) {
    this.getAllPosts();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getAllPosts(): void {
    this.allPosts$ = this._postService.allPosts$
      .pipe(
        startWith(''),
        switchMap(() => this._postService.getAllPosts()),
      );
  }

  public addPost(formData: IPostForm): void {
    this._postService.addPost(formData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public removePost(id: string): void {
    this._postService.removePost(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: any) => {
        window.scroll(0, 0);
        this.responseMessage = response.msg;
      });
  }

  public likePost(id: string): void {
    this._postService.likePost(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public unlikePost(id: string): void {
    this._postService.unlikePost(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

}
