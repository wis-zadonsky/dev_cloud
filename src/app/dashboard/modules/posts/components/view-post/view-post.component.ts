import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { IPost } from '../../interfaces/post.interface';
import { ICommentForm } from '../../interfaces/comment-form.interface';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent {

  @Input('post')
  public post$!: Observable<IPost<string>>;

  @Output()
  public formSubmit = new EventEmitter<ICommentForm>();

  @Output()
  public commentRemoved = new EventEmitter<string>();

  public readonly commentForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.commentForm = this._createForm();
  }

  public submit(): void {
    if (this.commentForm.valid) {
      this.formSubmit.emit(this.commentForm.value);
      this.commentForm.reset();
    }
    this.commentForm.markAllAsTouched();
  }

  public removeComment(id: string): void {
    this.commentRemoved.emit(id);
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      text: [null, Validators.required],
    });
  }

}
