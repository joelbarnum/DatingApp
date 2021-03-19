export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPage3: number;


}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}