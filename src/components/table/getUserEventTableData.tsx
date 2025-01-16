import { useEventsByIdQuery } from '../../queries/useEventQueries';
import { AggregatedEventData, DateRange } from '../../types/types';
import {
  aggregateEventsByName,
  convertToUserEventTable,
  filterEvents,
  getDateRangeArray,
  getEventsTotal,
} from '../../utils/utils';

export const GetUserEventTableData = (
  userId: string,
  selectedRange: DateRange
) => {
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  let aggregatedEvents: AggregatedEventData[] = [];
  let totalEvents: number = 0;

  const {
    data: userEvents,
    error,
    isError,
    isLoading,
  } = useEventsByIdQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  const filteredEvents = filterEvents(userEvents, selectedDates);
  aggregatedEvents = aggregateEventsByName(filteredEvents);
  totalEvents = getEventsTotal(aggregatedEvents);
  const convertedData = convertToUserEventTable(totalEvents, filteredEvents);

  return {
    data: convertedData,
    totalEvents,
  };
};
