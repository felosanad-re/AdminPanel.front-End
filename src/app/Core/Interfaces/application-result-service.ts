export interface ApplicationResultService<T> {
  succeeded: boolean;
  message?: string;
  errors: string[];
  data: T;
}
