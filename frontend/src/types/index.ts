export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  createdAt: string;
}

export type SortOrder = 'asc' | 'desc';

export interface TableState {
  sortBy: string;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  filterValue: string;
}

export interface TableData {
  users: User[];
  totalItems: number;
}
