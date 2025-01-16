'use client';
import { useMemo } from 'react';
import { useEventsQuery } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { UserEvent } from '../../types/types';
import {
  getDateRangeArray,
  filterEvents,
  aggregateEventsByName,
} from '../../utils/utils';
import { eventColumns } from './columns';
import DataTable from './DataTable/DataTable';

export const DisplayEventsTable = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  const { data: userEvents, error, isError, isLoading } = useEventsQuery();

  const filteredEventData = useMemo(() => {
    if (!userEvents) return [];
    const eventData: UserEvent[] = filterEvents(userEvents, selectedDates);

    return aggregateEventsByName(eventData);
  }, [selectedDates, userEvents]);

  console.log(filteredEventData);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <>
      <DataTable columns={eventColumns} data={filteredEventData} />
    </>
  );
};
