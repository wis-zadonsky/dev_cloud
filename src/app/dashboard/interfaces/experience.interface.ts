export interface IExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  current?: boolean;
  to?: string;
  description?: string;
}
