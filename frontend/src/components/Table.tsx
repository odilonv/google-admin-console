import React from 'react';
import { useTableState } from '../hooks/useTableState';
import { useTheme } from '../context/ThemeContext';
import { User } from '../types';
import DateFilter from './DateFilter';
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface TableProps {
  data: User[];
  loading?: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <NavigateBeforeIcon fontSize="small" />
        Previous
      </button>
      
      <div className="pagination-numbers">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'active' : ''}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <NavigateNextIcon fontSize="small" />
      </button>
    </div>
  );
};

/**
 * Composant Table principal
 */
const Table: React.FC<TableProps> = ({ data: initialData, loading = false }) => {
  const { theme } = useTheme();
  const { state, processedData, totalItems, setSort, setFilter, setPage, setColumnFilter } = useTableState(initialData);

  const totalPages = Math.ceil(totalItems / state.pageSize);

  const handleSort = (column: string) => {
    setSort(column);
  };

  const renderSortIndicator = (column: string) => {
    if (state.sortBy !== column) return null;
    return state.sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className={`table-container theme-${theme}`}>
      {/* Global filter bar */}
      <div className="global-filter-section">
        <div className="filter-wrapper">
          <label htmlFor="global-filter">
            <SearchIcon fontSize="small" className="search-icon" />
            Global Search:
          </label>
          <input 
            id="global-filter"
            type="text"
            placeholder="Search across all fields..."
            value={state.filterValue}
            onChange={(e) => setFilter(e.target.value)}
            className="global-filter-input"
          />
        </div>
        <div className="table-info">
          {totalItems} user{totalItems !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Column filters */}
      <div className="column-filters">
        <div className="column-filter">
          <label htmlFor="filter-id">ID</label>
          <input 
            id="filter-id"
            type="text"
            placeholder="Filter ID..."
            value={state.columnFilters?.id || ''}
            onChange={(e) => setColumnFilter('id', e.target.value)}
            className="column-filter-input"
          />
        </div>
        <div className="column-filter">
          <label htmlFor="filter-name">Name</label>
          <input 
            id="filter-name"
            type="text"
            placeholder="Filter name..."
            value={state.columnFilters?.name || ''}
            onChange={(e) => setColumnFilter('name', e.target.value)}
            className="column-filter-input"
          />
        </div>
        <div className="column-filter">
          <label htmlFor="filter-email">Email</label>
          <input 
            id="filter-email"
            type="text"
            placeholder="Filter email..."
            value={state.columnFilters?.email || ''}
            onChange={(e) => setColumnFilter('email', e.target.value)}
            className="column-filter-input"
          />
        </div>
        <div className="column-filter">
          <label htmlFor="filter-role">Role</label>
          <select 
            id="filter-role"
            value={state.columnFilters?.role || ''}
            onChange={(e) => setColumnFilter('role', e.target.value)}
            className="column-filter-select"
          >
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <div className="column-filter">
          <label htmlFor="filter-date">Date</label>
          <DateFilter
            value={state.columnFilters?.createdAt || ''}
            onChange={(v) => setColumnFilter('createdAt', v)}
          />
        </div>
      </div>

      {/* Responsive table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('id')}
                className="sortable"
                aria-sort={state.sortBy === 'id' ? (state.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                ID{renderSortIndicator('id')}
              </th>
              <th 
                onClick={() => handleSort('name')}
                className="sortable"
                aria-sort={state.sortBy === 'name' ? (state.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Name{renderSortIndicator('name')}
              </th>
              <th 
                onClick={() => handleSort('email')}
                className="sortable"
                aria-sort={state.sortBy === 'email' ? (state.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Email{renderSortIndicator('email')}
              </th>
              <th 
                onClick={() => handleSort('role')}
                className="sortable"
                aria-sort={state.sortBy === 'role' ? (state.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Role{renderSortIndicator('role')}
              </th>
              <th 
                onClick={() => handleSort('createdAt')}
                className="sortable"
                aria-sort={state.sortBy === 'createdAt' ? (state.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Creation Date{renderSortIndicator('createdAt')}
              </th>
            </tr>
          </thead>
          <tbody>
            {processedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-data">
                  No data found
                </td>
              </tr>
            ) : (
              processedData.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td data-label="Creation Date">{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={state.page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Table;