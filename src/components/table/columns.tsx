import { ColumnDef } from "@tanstack/react-table"
import { User } from "../../types/types"
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { HTMLProps } from "react";

export const userColumns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <IndeterminateCheckbox
            {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }}
            />
        ),
        cell: ({ row }) => (
            <div className="px-1">
            <IndeterminateCheckbox
                {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
                }}
            />
            </div>
        ),
    },
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
];

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }