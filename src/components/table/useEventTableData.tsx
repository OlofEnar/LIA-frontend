import { DateRange } from 'react-day-picker';
import {
  useEventsByUserIdQuery,
  useEventsQuery,
} from '../../queries/useEventQueries';
import { AggregatedEventData } from '../../types/types';
import {
  aggregateEventsByName,
  convertToUserEventTable,
  filterEvents,
  getDateRangeArray,
  getEventsTotal,
} from '../../utils/utils';

export const useEventTableData = (
  selectedRange: DateRange,
  userId?: string
) => {
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  let aggregatedEvents: AggregatedEventData[] = [];
  let totalEvents: number = 0;
  const eventsByIdQuery = useEventsByUserIdQuery(userId || '');
  const eventsQuery = useEventsQuery();

  const { data: userEvents } = userId ? eventsByIdQuery : eventsQuery;

  const filteredEvents = filterEvents(userEvents, selectedDates);
  aggregatedEvents = aggregateEventsByName(filteredEvents);
  totalEvents = getEventsTotal(aggregatedEvents);
  const convertedData = convertToUserEventTable(totalEvents, aggregatedEvents);

  return {
    data: convertedData,
    totalEvents,
  };
};
