import { useEventsByIdQuery } from "../queries/useEventQueries";
import { AggregatedEventData, DateRange, UserEvent } from "../types/types";
import { aggregateEventsByDate, convertToUserEventTable, getDateRangeArray } from "../utils/utils";

export const GetUserEventTableData = (userId: string, selectedRange: DateRange) => {
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
    let aggregatedEvents: AggregatedEventData[] = [];
    const eventNames: UserEvent[] = [];
    let totalEvents: number = 0;
    
    const { data: userEvents, error, isError, isLoading, } = useEventsByIdQuery(userId);
  
      if (isLoading) {return <div>Loading...</div> }
      if (isError) { return <div>An error occured {error.message}</div> }

      aggregatedEvents = aggregateEventsByDate(userEvents);
      
      selectedDates.forEach((date) => {
        const event = aggregatedEvents.find((event) => event.date === date);
        totalEvents += event?.eventTotal || 0;
        if (event) {
          event.events.forEach((item) => eventNames.push(item))
        } 
      });
    
    const filteredEvents = Array.from(eventNames.reduce((map, cur) => {
      const name = cur.eventName;
      
      if (map.has(name)) {
        const existingEvent = map.get(name);
        existingEvent.eventCount += cur.eventCount;
      } else {
        map.set(name, { ...cur });
      }  
      return map;
    }, new Map()).values());

    console.log(filteredEvents);
    const convertedData = convertToUserEventTable(totalEvents, filteredEvents) 
    
    console.log(convertedData);
    console.log(totalEvents);
  
    return {
      data: convertedData,
      totalEvents,
    };
  };