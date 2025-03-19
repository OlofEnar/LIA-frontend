import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEventsBarChart } from './useEventsBarChart';
import { format } from 'd3-format';

const EventsBarChart = () => {
  const { data: chartData, isLoading, isError, error } = useEventsBarChart();
  const tickFormatter = (tick: number) => format('~s')(tick).toUpperCase();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error && isError)
    return <div>An error occurred: {error.message}</div>;

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
        <YAxis tickFormatter={tickFormatter} />
        <Tooltip />
        <Bar
          dataKey="eventTotal"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default EventsBarChart;
