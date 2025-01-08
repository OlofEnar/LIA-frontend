import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AggregatedEventData } from '../../types/types';

const EventsBarChart = ({chartData}: {chartData:AggregatedEventData[]}) => {

    return (
      <ResponsiveContainer width="100%" maxHeight={400}>
        <BarChart
          data={chartData}
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