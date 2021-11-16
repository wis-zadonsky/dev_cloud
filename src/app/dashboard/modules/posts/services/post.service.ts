import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IPostForm } from '../interfaces/post-form.interface';
import { Environment } from '../../../../core/models/environment.model';
import { IPost } from '../interfaces/post.interface';
import { ICommentForm } from '../interfaces/comment-form.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private readonly allPostsSubject$ = new Subject<IPost<string>[]>();

  private readonly postSubject$ = new Subject<IPost<string>>();

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _environment: Environment,
  ) { }

  public get allPosts$(): Observable<IPost<string>[]> {
    return this.allPostsSubject$.asObservable();
  }

  public get post$(): Observable<IPost<string>> {
    return this.postSubject$.asObservable();
  }

  public getAllPosts(): Observable<IPost<string>[]> {
    return this._httpClient.get<IPost<string>[]>(`${this._environment.baseUrl}posts`);
  }

  public addPost(formData: IPostForm): Observable<Object> {
    return this._httpClient.post(`${this._environment.baseUrl}posts`, formData)
      .pipe(
        tap(() => this.allPostsSubject$.next()),
      );
  }

  public removePost(id: string): Observable<Object> {
    return this._httpClient.delete<Object>(`${this._environment.baseUrl}posts/${id}`)
      .pipe(
        tap(() => this.allPostsSubject$.next()),
      );
  }

  public likePost(id: string): Observable<Object> {
    return this._httpClient.put(`${this._environment.baseUrl}posts/like/${id}`, null)
      .pipe(
        tap(() => this.allPostsSubject$.next()),
      );
  }

  public unlikePost(id: string): Observable<Object> {
    return this._httpClient.put(`${this._environment.baseUrl}posts/unlike/${id}`, null)
      .pipe(
        tap(() => this.allPostsSubject$.next()),
      );
  }

  public viewPost(id: string): Observable<IPost<string>> {
    return this._httpClient.get<IPost<string>>(`${this._environment.baseUrl}posts/${id}`);
  }

  public addComment(formData: ICommentForm, id: string): Observable<Object> {
    return this._httpClient.post(`${this._environment.baseUrl}posts/comment/${id}`, formData)
      .pipe(
        tap(() => this.postSubject$.next()),
      );
  }

  public removeComment(commentId: string, postId: string): Observable<Object> {
    return this._httpClient.delete(
      `${this._environment.baseUrl}posts/comment/${postId}/${commentId}`)
      .pipe(
        tap(() => this.postSubject$.next()),
      );
  }

}
