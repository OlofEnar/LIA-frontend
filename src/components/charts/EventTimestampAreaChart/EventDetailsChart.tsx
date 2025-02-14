import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useEventDetailsChart } from './useEventDetailsChart';

export const EventDetailsChart = ({
  selectedEventName,
}: {
  selectedEventName: string;
}) => {
  const chartData = useEventDetailsChart(selectedEventName);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
