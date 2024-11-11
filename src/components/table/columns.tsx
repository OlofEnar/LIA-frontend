import { ColumnDef } from "@tanstack/react-table"
import { User } from "../../types/types"
import { ExternalLink } from 'lucide-react';

// export const userColumns = (navigate: (path: string) => void): ColumnDef<User>[] => [

export const userColumns: ColumnDef<User>[] = [
    { 
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => (info.getValue() as string).slice(0,4),

    },
    { accessorKey: 'score', header: 'Score'},
    { accessorKey: 'dailyEvents', header: 'Daily Events'},
    { accessorKey: 'mostUsedDailyEvent', header: 'Most used'},
    // { 
    //     id: 'link', 
    //     accessorKey: 'actions', 
    //     header: 'Actions',
    //     cell: ({ row }) => (
    //         <button
    //         onClick={() => navigate('/users/${row.original.id}')}
    //         style={{background : 'none', border: 'none', cursor: 'pointer'}}>
    //        <ExternalLink />
    //         </button>
    //     ),
    // },
];