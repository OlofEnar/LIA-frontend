import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import CustomTooltip from '../custom-tooltip/CustomTooltip';
import OptionsModal from '../../options-modal/OptionsModal';
import { useState } from 'react';
import { useUserActivityLineChart } from './useUserActivityLineChart';
import { format } from 'd3-format';

const UserActivityLineChart = ({ userId }: { userId: string }) => {
  const [chartMAWindowSize, setChartMAWindowSize] = useState(14);

  const handleChartMAWindowSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartMAWindowSize(Number(e.target.value));
  };
  const tickFormatter = (tick: number) => format('~s')(tick).toUpperCase();
  const {
    data: chartData,
    isLoading,
    isError,
    error,
  } = useUserActivityLineChart(userId, chartMAWindowSize);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error && isError)
    return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="cardHeader">
        <div className="label">User activity</div>
        <div className="pageSize">
          <span>Window</span>
          <select
            className="shadow buttonStyle"
            value={chartMAWindowSize}
            onChange={handleChartMAWindowSize}
          >
            {[3, 7, 14, 30, 100].map((windowSizeOption) => (
              <option key={windowSizeOption} value={windowSizeOption}>
                {windowSizeOption}
              </option>
            ))}
          </select>
        </div>
        <OptionsModal isGlobal={false} />
      </div>
      <ResponsiveContainer width="100%" maxHeight={300}>
        <LineChart data={chartData}>
          <Legend iconType="circle" iconSize={6} verticalAlign="top" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: string) => value.slice(5)}
          />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip
            content={
              <CustomTooltip
                active={undefined}
                payload={undefined}
                label={undefined}
              />
            }
          />
          <CartesianGrid vertical={false} />
          <Line
            animationDuration={400}
            dataKey="eventTotal"
            type="natural"
            stroke="#EC7862"
            strokeWidth={2}
            dot={{
              fill: '#EC7862',
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            animationDuration={400}
            type="monotone"
            dataKey="movingAverage"
            stroke="#82ca9d"
            name={`Moving Average (${chartMAWindowSize} days)`}
            strokeDasharray="5 5"
            dot={false}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default UserActivityLineChart;
