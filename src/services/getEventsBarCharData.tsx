import { useEventsQuery } from "../queries/useEventQueries";
import { useDateRangeStore } from "../store";
import { AggregatedEventData } from "../types/types";
import { getDateRangeArray } from "../utils/utils";

export const GetEventsBarCharData = () => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
  
    const { data: userEvents, error, isError, isLoading, } = useEventsQuery();
    
    const chartData: AggregatedEventData[] = [];
    const filteredChartData: AggregatedEventData[] = [];
    
    userEvents?.forEach((userEvent) => {
      const { date, eventCount, eventName } = userEvent;
      const index = chartData.findIndex(e => e.date === date);
  
      if (index > -1) {
        chartData[index].eventTotal += eventCount;
      } else {      
        chartData.push({ date: date, eventTotal: eventCount, eventName: eventName})
      }
    });
  
    selectedDates.forEach((date) => {
    const event = chartData.find((event) => event.date === date);
    if (event) {
      filteredChartData.push(event)
    } 
    });
  
    filteredChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }
  
    return filteredChartData;
  };