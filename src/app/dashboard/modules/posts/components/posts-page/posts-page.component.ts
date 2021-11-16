import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { IPostForm } from '../../interfaces/post-form.interface';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent {

  @Input('allPosts')
  public allPosts$!: Observable<IPost<string>[]>;

  @Input()
  public responseMessage!: string;

  @Output()
  public formSubmit = new EventEmitter<IPostForm>();

  @Output()
  public postRemove = new EventEmitter<string>();

  @Output()
  public postLiked = new EventEmitter<string>();

  @Output()
  public postUnliked = new EventEmitter<string>();

  public readonly postsForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.postsForm = this._createForm();
  }

  public submit(): void {
    if (this.postsForm.valid) {
      this.formSubmit.emit(this.postsForm.value);
      this.postsForm.reset();
    }
    this.postsForm.markAllAsTouched();
  }

  public removePost(id: string): void {
    this.postRemove.emit(id);
  }

  public likePost(id: string): void {
    this.postLiked.emit(id);
  }

  public unlikePost(id: string): void {
    this.postUnliked.emit(id);
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      text: [null, Validators.required],
    });
  }

}
