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
import styles from './charts.module.scss';
import { AggregatedEventData } from '../../types/types';
import { format } from 'd3-format';

type BarChartProps = {
  chartData: AggregatedEventData[];
};

const tickFormatter = (tick: number) => format('~s')(tick).toUpperCase();

const EventBarChart = ({ chartData }: BarChartProps) => {
  if (chartData.length < 3) {
    return (
      <div className={styles.chartWarning}>
        <span>Not enough datapoints...</span>
        <span>({chartData.length})</span>
      </div>
    );
  } else
    return (
      <ResponsiveContainer width="100%" maxHeight={250}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
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
export default EventBarChart;
