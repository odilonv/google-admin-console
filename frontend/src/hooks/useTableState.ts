import { useState, useMemo, useEffect, useCallback } from 'react';

interface TableState {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
  filterValue: string;
  columnFilters: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    createdAt?: string;
  };
}

const STORAGE_KEY = 'tableStatePersistence';

const initialDefaultState: TableState = {
  sortBy: 'id',
  sortOrder: 'asc',
  page: 1,
  pageSize: 20,
  filterValue: '',
  columnFilters: {},
};

export const useTableState = (initialData: any[]) => {
  const getInitialState = (): TableState => {
    try {
      const storedState = localStorage.getItem(STORAGE_KEY);
      if (storedState) {
        return JSON.parse(storedState);
      }
    } catch (e) {
      console.error("Unable to read persisted state:", e);
    }
    return initialDefaultState;
  };

  const [state, setState] = useState<TableState>(getInitialState);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Unable to save persisted state:", e);
    }
  }, [state]);

  const setSort = useCallback((sortBy: string) => {
    setState(prevState => ({
      ...prevState,
      sortBy,
      sortOrder: prevState.sortBy === sortBy && prevState.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setState(prevState => ({ ...prevState, page }));
  }, []);

  const setFilter = useCallback((filterValue: string) => {
    setState(prevState => ({ ...prevState, filterValue, page: 1 }));
  }, []);

  const setColumnFilter = useCallback((column: string, value: string) => {
    setState(prevState => ({
      ...prevState,
      columnFilters: { ...prevState.columnFilters, [column]: value },
      page: 1,
    }));
  }, []);

  const processedData = useMemo(() => {
    let result = data;
    const { sortBy, sortOrder, filterValue, columnFilters, pageSize, page } = state;

    if (filterValue) {
      const lowerCaseFilter = filterValue.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerCaseFilter)
        )
      );
    }

    if (columnFilters) {
      Object.entries(columnFilters).forEach(([column, filterVal]) => {
        if (filterVal) {
          const lowerCaseFilter = filterVal.toLowerCase();
          result = result.filter(item => {
            if (column === 'createdAt') {
              const date = new Date(item[column]);
              if (isNaN(date.getTime())) return false;

              // French long format (e.g. "1 janvier 2025")
              const formattedDate = date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).toLowerCase();

              // dd/mm/yyyy and d/m/yyyy variants
              const day = String(date.getDate());
              const dayP = day.padStart(2, '0');
              const month = String(date.getMonth() + 1);
              const monthP = month.padStart(2, '0');
              const year = String(date.getFullYear());
              const slashFormat = `${day}/${month}/${year}`; // e.g. 1/5/2020
              const slashFormatP = `${dayP}/${monthP}/${year}`; // e.g. 01/05/2020

              return (
                formattedDate.includes(lowerCaseFilter) ||
                slashFormat.includes(lowerCaseFilter) ||
                slashFormatP.includes(lowerCaseFilter)
              );
            }
            return String(item[column]).toLowerCase().includes(lowerCaseFilter);
          });
        }
      });
    }

    result.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (page - 1) * pageSize;
    const paginatedData = result.slice(startIndex, startIndex + pageSize);

    return paginatedData;
  }, [data, state]);


  return {
    state,
    processedData,
    totalItems: data.length,
    setSort,
    setPage,
    setFilter,
    setColumnFilter,
    setData
  };
};