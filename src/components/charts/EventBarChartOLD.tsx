import { getEvents } from "../../services/api"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserEvent } from '../../types/types';
import { useQuery } from 'react-query';
import { useDateRangeStore, useUserCountStore } from "../../store";
import { getDateRangeArray } from "../../utils/utils";
import { useEffect } from "react";

const EventBarChart = ({selectedEventName}) => {
  const { selectedRange } = useDateRangeStore();
  const { setUserCount } = useUserCountStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)

  const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['userEvents'], 
    queryFn: () => getEvents(),    
  });
  
  let chartData: UserEvent[] = [];
  const eventMap = new Map();
  const uniqueUsers = new Set<string>();
  let userCount: number = 0;
  
  userEvents?.forEach((userEvent) => {
    const { date, eventCount, eventName, userId } = userEvent;
    const key = `${date}-${eventName}`;
  
    if (eventMap.has(key)) {
      eventMap.get(key).eventCount += eventCount;
    } else {
      eventMap.set(key, { ...userEvent });
    }
  
    if (eventName === selectedEventName && selectedDates.includes(date)) {
      uniqueUsers.add(userId);
    }
  });
  
  chartData = selectedDates.map((date) => {
    const key = `${date}-${selectedEventName}`;
    return eventMap.get(key);
  }).filter(event => event !== undefined);
  
  userCount = uniqueUsers.size;
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

 useEffect(() => {
  setUserCount(userCount);
  console.log(`${userCount} unique users on ${selectedEventName}`);
}, [userCount, setUserCount, selectedEventName]);

  if (isLoading) {return <div>Loading...</div> }
  if (isError) { return <div>An error occured {error.message}</div> }

  // if(chartData.length < 1) {
  //   return (
  //     <div className={styles.chartWarning}>
  //       <span>Not enough datapoints...</span>
  //       <span>({chartData.length})</span>
  //       </div>
  //   )
  // } else

    return (
      <ResponsiveContainer width="100%" maxHeight={250}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />   
          <YAxis />
          <Tooltip />
          <Bar dataKey="eventCount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  };
export default EventBarChart;