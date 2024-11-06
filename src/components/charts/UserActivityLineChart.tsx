import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getEventsByUserId } from '../../services/api';
import { useQuery } from "react-query";
import { AggregatedEventData, UserEvent } from '../../types/types';

const userId = "e51718cd-8af1-4045-9ed7-31c7022ecbc3"

const UserActivityLineChart = () => {
  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents', userId], 
    queryFn: () => getEventsByUserId(userId),    
  });

  console.dir(userEvents)

   const chartData: AggregatedEventData[] = [];

   userEvents?.forEach((userEvent) => {
    const { date, eventCount } = userEvent;
    const test = chartData.findIndex(e => e.date === date);

    if (test > -1) {
       chartData[test].eventTotal += eventCount;
    } else {      
       chartData.push({ date: date, eventTotal: eventCount})
    }
  });

   console.log(chartData)
  
  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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