import { IComment } from './comment.interface';

export interface IPost<T> {
  _id: T;
  user: T;
  avatar: T;
  text: T;
  name: T;
  likes: [];
  date: T;
  comments: IComment<string>[];
}
