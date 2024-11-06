import { getEvents } from "../../services/api"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AggregatedEventData, UserEvent } from '../../types/types';
import { useQuery } from 'react-query';

const EventsBarChart = () => {
  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents'], 
    queryFn: () => getEvents(),    
  });
  
  console.dir(userEvents)

  const chartData: AggregatedEventData[] = [];

  userEvents?.forEach((userEvent) => {
   const { date, eventCount, eventName } = userEvent;
   const test = chartData.findIndex(e => e.date === date);

   if (test > -1) {
      chartData[test].eventTotal += eventCount;
   } else {      
      chartData.push({ date: date, eventTotal: eventCount, eventName: eventName})
   }
 });

  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="eventTotal" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  };
export default EventsBarChart;