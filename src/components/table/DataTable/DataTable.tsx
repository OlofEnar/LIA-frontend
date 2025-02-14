import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  getFilteredRowModel,
  filterFns,
} from '@tanstack/react-table';
import '../../../types/types';
import './DataTable.scss';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
import { useSelectedUsersStore } from '../../../store';
import { useNavigate } from 'react-router';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showTotalFooter?: boolean;
  tableType: string;
  customPageSize?: number;
  showSearch?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showTotalFooter = false,
  tableType,
  customPageSize = 10,
  showSearch = true,
}: DataTableProps<TData, TValue>) {
  const { setSelectedUserIds } = useSelectedUsersStore();
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: customPageSize,
  });
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    table.setGlobalFilter(value);
    console.log(value);
  };

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: filterFns.includesString,
    state: {
      sorting,
      pagination,
      rowSelection,
      globalFilter: searchValue,
    },
  });

  const urlPath = (tableType: string, row: any) =>
    tableType === 'user'
      ? `/users/${row.original.id}`
      : tableType === 'event'
      ? `/events/${row.original.eventName}`
      : '/';

  const navigate = useNavigate();
  const handleRowClick = (tableType: string, row: any) => {
    navigate(urlPath(tableType, row));
  };

  useEffect(() => {
    const selectedIds = Object.keys(table.getState().rowSelection).map(
      (rowId) => {
        const row = table.getRow(rowId);
        return row?.original?.id;
      }
    );

    setSelectedUserIds(selectedIds);
  }, [table.getState().rowSelection, setSelectedUserIds]);

  return (
    <div>
      {showSearch && (
        <div className="inputContainer">
          <Search strokeWidth={1.5} size={14} className="icon" />
          <input
            className="inputField"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </div>
      )}
      <div className="tableContainer">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowDown size={11} />,
                        desc: <ArrowUp size={11} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(tableType, row)}
                style={{ cursor: 'pointer' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {showTotalFooter && (
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <td key={footer.id}>
                      {flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
      <div className="tableFooter">
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        {/* <div className="pageSize">
          <span>Show</span>
          <select
            className="shadow buttonStyle"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div> */}
        <div className="tableFooterRight">
          <span className="flex items-center gap-1">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </span>
          <div className="paginationButtons">
            <button
              className="pagination shadow buttonStyle"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {<ChevronsLeft className="paginationIcons" strokeWidth={1} />}
            </button>
            <button
              className="pagination shadow buttonStyle"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {<ChevronLeft className="paginationIcons" strokeWidth={1} />}
            </button>
            <button
              className="pagination shadow buttonStyle"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {<ChevronRight className="paginationIcons" strokeWidth={1} />}
            </button>
            <button
              className="pagination shadow buttonStyle"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {<ChevronsRight className="paginationIcons" strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DataTable;
