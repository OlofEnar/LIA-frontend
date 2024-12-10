import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { getEventsByUserId } from '../../services/api';
import { useQuery } from 'react-query';
import { AggregatedEventData, EventNames, UserEvent } from '../../types/types';
import { useDateRangeStore, useCsvStore } from '../../store';
import CustomTooltip from './custom-tooltip/CustomTooltip';
import { calcMovingAverage, getDateRangeArray } from '../../utils/utils';
import OptionsModal from '../options-modal/OptionsModal';
import { useState } from 'react';

const UserActivityLineChart = ({userId}: {userId:string}) => {
  const { selectedRange } = useDateRangeStore();
  const { setExportData } = useCsvStore();
  const [ windowSize, setWindowSize ] = useState(14);
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
  console.log(selectedDates);
  console.log(userId)

  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents', userId], 
    queryFn: () => getEventsByUserId(userId),
    enabled: !!userId,    
  });

   const chartData: AggregatedEventData[] = [];
   const filteredChartData: AggregatedEventData[] = [];

   userEvents?.forEach((userEvent) => {
    const { date, eventCount } = userEvent;
    const index = chartData.findIndex(e => e.date === date);

    if (index > -1) {
       chartData[index].eventTotal += eventCount;
       chartData[index].events.push(userEvent);

    } else {
      const eventArray: UserEvent[] = [];      
      eventArray.push(userEvent);

      chartData.push({
          date: date,
          eventTotal: eventCount,
          events: eventArray,
      });
    }
  });

   selectedDates.forEach((date) => {
    const event = chartData.find((event) => event.date === date);
    if (event) {
      filteredChartData.push(event)
    } 
   });

   filteredChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
   const movingAverageData = calcMovingAverage(filteredChartData, windowSize);

  // Merge MA & ChartData
  const mergedChartData = filteredChartData.map((dataPoint, index) => ({
    ...dataPoint,
    movingAverage: movingAverageData[index]?.movingAverage
  }));

  const handleWindowSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWindowSize(Number(e.target.value));
  };

  const eventsToExport: EventNames[] = [];
  filteredChartData.forEach((group) => {
   group.events.forEach(event => {
     eventsToExport.push(event);
   });
  });
  setExportData(eventsToExport);

  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

    return (
      <>
      <div className="cardHeader">
        <div className="label">User activity</div>
        <div className="pageSize">
          <span>Window</span>
          <select
            className="shadow buttonStyle"
            value={windowSize}
            onChange={handleWindowSize}
          >
            {[3, 7, 14, 30, 100].map(windowSizeOption => (
              <option key={windowSizeOption} value={windowSizeOption}>
                {windowSizeOption}
              </option>
            ))}
          </select>
      </div>
      <OptionsModal isGlobal={false} />
      </div>
      <ResponsiveContainer width="100%" maxHeight={400}>
        <LineChart data={mergedChartData}>
        <Legend
          iconType='circle'
          iconSize={6}
          verticalAlign='top'
        />
        <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />          
          <YAxis  />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />}/>
          <CartesianGrid vertical={false} />
          <Line
              animationDuration={400}
              dataKey="eventTotal"
              type="natural"
              stroke="#EC7862"
              strokeWidth={2}
              dot={{
                fill: "#EC7862",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              animationDuration={400}
              type="monotone"
              dataKey="movingAverage"
              stroke="#82ca9d"
              name={`Moving Average (${windowSize} days)`}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={true}
            />        
            </LineChart>
      </ResponsiveContainer>
      </>
    );  
  };
export default UserActivityLineChart;