import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ICommentForm } from '../../interfaces/comment-form.interface';

@Component({
  selector: 'app-view-post-container',
  templateUrl: './view-post.container.html',
})
export class ViewPostContainer implements OnDestroy {

  public post$!: Observable<IPost<string>>;

  private readonly _id: string = this._activatedRoute.snapshot.params.id;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _postService: PostService,
    ) {
    this.viewPost();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public viewPost(): void {
    this.post$ = this._postService.post$
      .pipe(
        startWith(''),
        switchMap(() => this._postService.viewPost(this._id)),
      );
  }

  public addComment(formData: ICommentForm): void {
    this._postService.addComment(formData, this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public removeComment(id: string): void {
    this._postService.removeComment(id, this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

}
