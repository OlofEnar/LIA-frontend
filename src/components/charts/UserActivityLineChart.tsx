import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getEventsByUserId } from '../../services/api';
import { useQuery } from 'react-query';
import { AggregatedEventData, UserEvent } from '../../types/types';
import getDateRangeArray from '../../utils/getDateRangeArray';
import { useDateRangeStore } from '../../store';

const userId = "e51718cd-8af1-4045-9ed7-31c7022ecbc3"

const UserActivityLineChart = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
  console.log(selectedDates);

  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents', userId], 
    queryFn: () => getEventsByUserId(userId),    
  });

   const chartData: AggregatedEventData[] = [];
   const filteredChartData: AggregatedEventData[] = [];
   
   userEvents?.forEach((userEvent) => {
    const { date, eventCount } = userEvent;
    const index = chartData.findIndex(e => e.date === date);

    if (index > -1) {
       chartData[index].eventTotal += eventCount;
    } else {      
       chartData.push({ date: date, eventTotal: eventCount})
    }
  });

   selectedDates.forEach((date) => {
    const event = chartData.find((event) => event.date === date);
    if (event) {
      filteredChartData.push(event)
    } 
   });
  
  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredChartData}>
        <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />          
          <YAxis  />
          <Tooltip />
          <CartesianGrid vertical={false} />
          <Legend />
          <Line
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