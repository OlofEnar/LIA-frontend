import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from "./charts.module.scss"
import { UserEvent } from '../../types/types';

const EventBarChart = ({chartData}: {chartData:UserEvent[]}) => {
  console.log(chartData);

    if(chartData.length < 3) {
      return (
        <div className={styles.chartWarning}>
          <span>Not enough datapoints...</span>
          <span>({chartData.length})</span>
        </div>
      )
    } else

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