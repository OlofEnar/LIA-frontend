import { getEvents } from "../../services/api"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AggregatedEventData, UserEvent } from '../../types/types';
import { useQuery } from 'react-query';
import { useDateRangeStore } from "../../store";
import { getDateRangeArray } from "../../utils/utils";

const EventsBarChart = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)

  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents'], 
    queryFn: () => getEvents(),    
  });
  
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

    return (
      <ResponsiveContainer width="100%" maxHeight={400}>
        <BarChart
          data={filteredChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis 
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(5)}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="eventTotal" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  };
export default EventsBarChart;