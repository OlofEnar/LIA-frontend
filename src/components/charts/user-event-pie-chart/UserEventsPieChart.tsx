import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useDateRangeStore } from "../../../store";
import { useQuery } from "react-query";
import { getEventsByUserId } from "../../../services/api";
import { UserEvent, AggregatedEventData } from "../../../types/types";
import styles from "./UserEventsPieChart.module.scss"
import { getDateRangeArray } from "../../../utils/utils";

const UserEventsPieChart = ({userId}: {userId:string}) => {
let totalEvents: number = 0;
const { selectedRange } = useDateRangeStore();
const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
const chartData: AggregatedEventData[] = [];
const eventNames: UserEvent[] = [];

const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
    queryKey: ['pieEvents', userId], 
    queryFn: () => getEventsByUserId(userId),
    enabled: !!userId,    
  });
  
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
   totalEvents += event?.eventTotal || 0;
   if (event) {
     event.events.forEach((item) => eventNames.push(item))
   } 
  });

const filteredChartData = Array.from(eventNames.reduce((map, cur) => {
  const name = cur.eventName;
  
  if (map.has(name)) {
    console.log(`Found existing event: ${name}, adding count: ${cur.eventCount}`);
    const existingEvent = map.get(name);
    existingEvent.eventCount += cur.eventCount;
    console.log(`Updated event count for ${name}: ${existingEvent.eventCount}`);
  } else {
    console.log(`Adding new event: ${name} with count: ${cur.eventCount}`);
    map.set(name, { ...cur });
  }  
  return map;
}, new Map()).values());

console.log('Final output:', filteredChartData);

 
 if (isLoading) {return <div>Loading...</div> }
 if (isError) { return <div>An error occured {error.message}</div> }

return (
        <ResponsiveContainer width={"100%"} maxHeight={300}>
          <PieChart>
          <Tooltip />
            <Pie
              data={filteredChartData}
              dataKey="eventCount"
              nameKey="eventName"
              innerRadius={60}
              strokeWidth={5}
              animationDuration={400}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={styles.chartTotal}
                        >
                        {totalEvents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className=""
                        >
                          Events
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
  );
};
export default UserEventsPieChart;