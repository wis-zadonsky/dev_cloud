import { Observable } from 'rxjs';

import { IUser } from '@app/shared';

import { IExperience } from './experience.interface';
import { IEducation } from './education.interface';
import { ISocial } from './social.interface';
import { IGithub } from './github.interface';

export interface IUserProfile<T> {
  status: T;
  company: T;
  website: T;
  location: T;
  skills: T;
  experience: IExperience[];
  education: IEducation[];
  user: IUser;
  githubUsername: T;
  bio: T;
  social: ISocial;
  githubRepos?: Observable<IGithub[]>;
}
