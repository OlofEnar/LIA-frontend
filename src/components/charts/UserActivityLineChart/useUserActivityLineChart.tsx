import { useEventsByIdQuery } from '../../../queries/useEventQueries';
import { useDateRangeStore } from '../../../store';
import { AggregatedEventData, UserEvent } from '../../../types/types';
import {
  getDateRangeArray,
  calcMovingAverage,
  aggregateEventsByDate,
  filterEvents,
} from '../../../utils/utils';

export const useUserActivityLineChart = (
  userId: string,
  windowSize: number
) => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  const {
    data: userEvents,
    error,
    isError,
    isLoading,
  } = useEventsByIdQuery(userId);
  let chartData: AggregatedEventData[] = [];
  let filteredChartData: UserEvent[] = [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  filteredChartData = filterEvents(userEvents, selectedDates);
  chartData = aggregateEventsByDate(filteredChartData);
  chartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const movingAverageData = calcMovingAverage(chartData, windowSize);
  console.log(movingAverageData);

  // Merge MA & ChartData
  const mergedChartData = chartData.map((dataPoint, index) => ({
    ...dataPoint,
    movingAverage: movingAverageData[index]?.movingAverage,
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
