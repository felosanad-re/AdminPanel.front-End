export interface Pagination<T> {
  pageSize: number;
  pageIndex: number;
  data: T[];
  count: number;
}
