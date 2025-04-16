import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { useEventDetailsChart } from './useEventDetailsChart';
import { format } from 'd3-format';

export const EventDetailsChart = ({ eventName }: { eventName: string }) => {
  const { data, error, isError, isLoading } = useEventDetailsChart(eventName);

  const tickFormatter = (tick: number) => format('~s')(tick).toUpperCase();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error instanceof Error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="hour" />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip />
          <Area
            animationDuration={400}
            type="monotone"
            dataKey="eventCount"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#count)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
