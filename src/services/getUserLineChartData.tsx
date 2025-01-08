import { useEventsByIdQuery } from "../queries/useEventQueries";
import { useDateRangeStore } from "../store";
import { AggregatedEventData } from "../types/types";
import { getDateRangeArray, calcMovingAverage, AggregateEvents } from "../utils/utils";

export const GetUserLineChartData = (userId: string, windowSize: number ) => {
    const { selectedRange } = useDateRangeStore();  
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
    
    const { data: userEvents, error, isError, isLoading, } = useEventsByIdQuery(userId);

      if (isLoading) {return <div>Loading...</div> }
      if (isError) { return <div>An error occured {error.message}</div> }
    
       const chartData: AggregatedEventData[] = [];
       const filteredChartData: AggregatedEventData[] = [];
    
        AggregateEvents(userEvents, chartData);
       
/*        userEvents?.forEach((userEvent) => {
        const { date, eventCount } = userEvent;
        const index = chartData.findIndex(e => e.date === date);
    
        if (index > -1) {
           chartData[index].eventTotal += eventCount;
           chartData[index].events = chartData[index].events ?? [];
           chartData[index].events.push(userEvent);
          } else {
            chartData.push({
              date: date ?? '',
              eventTotal: eventCount,
              events: [userEvent],
            });
        }
      }); */
    
       selectedDates.forEach((date) => {
        const event = chartData.find((event) => event.date === date);
        if (event) {
          filteredChartData.push(event)
        } 
       });
    
       filteredChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
       
       const movingAverageData = calcMovingAverage(filteredChartData, windowSize);
       console.log(movingAverageData);
    
      // Merge MA & ChartData
      const mergedChartData = filteredChartData.map((dataPoint, index) => ({
        ...dataPoint,
        movingAverage: movingAverageData[index]?.movingAverage
      }));
    
/*       const eventsToExport: UserEvent[] = [];
      filteredChartData.forEach((group) => {
       group.events = group.events ?? [];
       group.events.forEach(event => {
         eventsToExport.push(event);
       });
      });
      setExportData(eventsToExport); */

      console.log(mergedChartData);
      return mergedChartData;
};
