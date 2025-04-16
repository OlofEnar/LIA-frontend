import { ColumnDef } from '@tanstack/react-table';
import { AggregatedEventData, AggregatedUserData } from '../../types/types';
import React, { HTMLProps } from 'react';

export const userColumns = (
  totalEvents?: number
): ColumnDef<AggregatedUserData>[] => [
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
    accessorKey: 'user.id',
    header: 'ID',
    cell: (info) => info.getValue() as string,
  },
  { accessorKey: 'user.userCountry', header: 'Country' },
  { accessorKey: 'user.clientVersion', header: 'Client', footer: 'Total' },
  {
    accessorKey: 'eventTotal',
    header: 'Events',
    footer: () => totalEvents,
  },
];

export const eventColumns = (
  totalEvents?: number
): ColumnDef<AggregatedEventData>[] => [
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
  { accessorKey: 'eventName', header: 'Event' },
  { accessorKey: 'eventDistribution', header: '%', footer: 'Total' },
  {
    accessorKey: 'eventTotal',
    header: 'Count',
    footer: () => totalEvents,
  },
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
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
