import { useEventsByIdQuery } from "../queries/useEventQueries";
import { useDateRangeStore } from "../store";
import { AggregatedEventData, UserEventTable, UserEvent } from "../types/types";
import { AggregateEvents, getDateRangeArray } from "../utils/utils";

export const GetUserEventTableData = (userId: string) => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
    const chartData: AggregatedEventData[] = [];
    const eventNames: UserEventTable[] = [];
    let totalEvents: number = 0;
    
    const { data: userEvents, error, isError, isLoading, } = useEventsByIdQuery(userId);
  
      if (isLoading) {return <div>Loading...</div> }
      if (isError) { return <div>An error occured {error.message}</div> }

      AggregateEvents(userEvents, chartData);
  
/*     userEvents?.forEach((userEvent) => {
        const { date, eventCount } = userEvent;
        const index = chartData.findIndex(e => e.date === date);
    
        if (index > -1) {
            chartData[index].eventTotal += eventCount;
            chartData[index].events = chartData[index].events ?? [];
            chartData[index].events.push(userEvent);   
          } else {
            chartData.push({
              date: date,
              eventTotal: eventCount,
              events: [userEvent], 
            });
        }
      }); */
    
      selectedDates.forEach((date) => {
        const event = chartData.find((event) => event.date === date);
        totalEvents += event?.eventTotal || 0;
        if (event) {
          event.events.forEach((item) => eventNames.push(item))
        } 
      });
    
    const filteredChartData = Array.from(eventNames.reduce((map, cur) => {
      const name = cur.eventName;
      
      if (map.has(name)) {
        const existingEvent = map.get(name);
        existingEvent.eventCount += cur.eventCount;
      } else {
        map.set(name, { ...cur });
      }  
      return map;
    }, new Map()).values());
        
    const finalChartData = convertToUserEventTable(filteredChartData) 
  
    function convertToUserEventTable(
      data: UserEvent[],
    ): UserEventTable[] {
      return data.map((event) => ({
        ...event,
        eventDistribution: ((event.eventCount / totalEvents) * 100).toFixed(1) + '%',
      }));
    };
  
    console.log(finalChartData);
    console.log(totalEvents);
  
    return {
      data: finalChartData,
      totalEvents,
    };
  };