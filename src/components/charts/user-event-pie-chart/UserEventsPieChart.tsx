import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useDateRangeStore } from "../../../store";
import getDateRangeArray from "../../../utils/getDateRangeArray";
import { useQuery } from "react-query";
import { getEventsByUserId } from "../../../services/api";
import { UserEvent, AggregatedEventData } from "../../../types/types";
import styles from "./UserEventsPieChart.module.scss"

const UserEventsPieChart = ({userId}: {userId:string}) => {
const { selectedRange } = useDateRangeStore();
const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
let totalEvents: number = 0;

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
   totalEvents += event?.eventTotal || 0;
   console.log(totalEvents);
   if (event) {
     filteredChartData.push(event)
   } 
  });


  console.log(filteredChartData);
 
 if (isLoading) {return <div>Loading...</div> }
 if (isError) { return <div>An error occured {error.message}</div> }

return (
        <ResponsiveContainer width={"100%"} maxHeight={300}>
          <PieChart>
          <Tooltip />
            <Pie
              data={filteredChartData}
              dataKey="eventTotal"
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