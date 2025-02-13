import { ColumnDef } from '@tanstack/react-table';
import { User, UserEventTable } from '../../types/types';
import { ExternalLink, FlagTriangleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { HTMLProps } from 'react';

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

      return (
        <button
          onClick={() => navigate(`/users/${row.original.id}`)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ExternalLink size={15} />
        </button>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => (info.getValue() as string).slice(0, 4),
  },
  { accessorKey: 'score', header: 'Score' },
  /*     { 
        id: 'trend', 
        accessorKey: 'trend', 
        header: 'Trend',
        cell: ({ row }) => {            
            return (
                <TrendingDown size={15} color="red"/>
            )                       
        },
    }, */
  {
    id: 'status',
    accessorFn: (row) => {
      const score = row.score;
      if (score > 5) {
        return 'green';
      } else if (score > 2) {
        return 'yellow';
      }
      return 'red';
    },
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const color =
        status === 'green' ? 'green' : status === 'yellow' ? 'orange' : 'red';
      return <FlagTriangleRight fill={color} size={15} color={color} />;
    },
  },
];

export const eventColumns = (
  totalEvents: number
): ColumnDef<UserEventTable>[] => [
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

      return (
        <button
          onClick={() => navigate(`/events/${row.original.eventName}`)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ExternalLink size={15} />
        </button>
      );
    },
  },
  { accessorKey: 'eventName', header: 'Event', footer: 'Total' },
  { accessorKey: 'eventTotal', header: 'Count', footer: () => totalEvents },
  { accessorKey: 'eventDistribution', header: '%', footer: '100%' },
];

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
