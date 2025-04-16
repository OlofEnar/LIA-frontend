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
import { format } from 'd3-format';
import { useAggregatedEventsByDate } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { formatDateRange } from '../../utils/utils';

const EventsBarChart = () => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);

  const { data, error, isError, isLoading } = useAggregatedEventsByDate(
    startDate,
    endDate
  );
  const tickFormatter = (tick: number) => format('~s')(tick).toUpperCase();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error && isError)
    return <div>An error occurred: {error.message}</div>;

  return (
    <ResponsiveContainer width="100%" maxHeight={400}>
      <BarChart
        data={data?.aggregatedEvents}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="eventDate"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(5)}
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
