import { ColumnDef } from "@tanstack/react-table"
import { User } from "../../types/types"
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const userColumns: ColumnDef<User>[] = [
    { 
        id: 'link', 
        accessorKey: 'actions', 
        header: 'Actions',
        cell: ({ row }) => {
            const navigate = useNavigate();
            
            return <button onClick={() => navigate(`/users/${row.original.id}`)}
            style={{background : 'none', border: 'none', cursor: 'pointer'}}>
            <ExternalLink size={15}/>
            </button>
        },
    },
    { 
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => (info.getValue() as string).slice(0,4),

    },
    { accessorKey: 'score', header: 'Score'},
    { accessorKey: 'dailyEvents', header: 'Daily Events'},
    { accessorKey: 'mostUsedDailyEvent', header: 'Most used'},
];
