import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getEventsByUserId } from '../../services/api';
import { useQuery } from 'react-query';
import { AggregatedEventData, UserEvent } from '../../types/types';
import getDateRangeArray from '../../utils/getDateRangeArray';
import { useDateRangeStore } from '../../store';
import CustomTooltip from './custom-tooltip/CustomTooltip';

const UserActivityLineChart = ({userId}: {userId:string}) => {
  const { selectedRange } = useDateRangeStore();
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
      console.log(eventArray)

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
   console.log(filteredChartData);
  

  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

    return (
      <ResponsiveContainer width="100%" maxHeight={400}>
        <LineChart data={filteredChartData}>
        <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />          
          <YAxis  />
          <Tooltip content={<CustomTooltip />}/>
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
            </LineChart>
      </ResponsiveContainer>
    );  
  };
export default UserActivityLineChart;