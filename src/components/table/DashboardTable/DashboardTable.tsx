import {
    ColumnDef,
    getCoreRowModel, 
    useReactTable, 
    flexRender, 
    SortingState,
    getPaginationRowModel, 
    getSortedRowModel,
    PaginationState} from "@tanstack/react-table"
import "../../../types/types"
import "./dashboardTable.scss"
import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ExternalLink } from 'lucide-react';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]    
}
    
export function DashboardTable<TData, TValue>({
columns,
data,
}: DataTableProps<TData, TValue>) {

const [sorting, setSorting] = useState<SortingState>([]);
const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
})

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
        sorting,
        pagination,
    },           
    });

    
// useEffect(() => {
//     const order = sorting[0]?.desc ? "desc" : "asc";
//     const sort = sorting[0]?.id ?? "id"; 
// }, [sorting]
// )

    return (
        <div>
            <div className="tableContainer">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    <div
                                    {...{
                                        className: header.column.getCanSort()
                                        ? "cursor-pointer select-none"
                                        : "",
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{ 
                                            asc: <ArrowDown size={11} />, 
                                            desc: <ArrowUp size={11}/> 
                                        }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    </th>                                    
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div  className="tableFooter">
            <div>
                Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                {table.getRowCount().toLocaleString()} Rows
            </div>
            <span className="flex items-center gap-1">
                Page{' '}
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount().toLocaleString()}
                </span>
                <div className="paginationButtons">
                    <button
                        className="pagination shadow"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        {<ChevronsLeft className="paginationIcons" strokeWidth={1}/>}
                        </button>
                        <button
                        className="pagination shadow buttonStyle"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        {<ChevronLeft className="paginationIcons" strokeWidth={1}/>}
                        </button>
                        <button
                        className="pagination shadow"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                        {<ChevronRight className="paginationIcons" strokeWidth={1}/>}
                        </button>
                        <button
                        className="pagination shadow"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        >
                        {<ChevronsRight className="paginationIcons" strokeWidth={1}/>}
                        </button>
                    </div>
                </div>
            </div>
    );
};
export default DashboardTable 