import * as Separator from '@radix-ui/react-separator';
import { AggregatedEventData, UserEvent } from '../../../types/types';
import styles from './CustomTooltip.module.scss';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const chartData = payload[0].payload as AggregatedEventData;
    const topEvents: UserEvent[] = (chartData.events ?? [])
      .sort((a, b) => b.eventCount - a.eventCount)
      .slice(0, 3);

    return (
      <div className={styles.container}>
        <strong>Top 3 events:</strong>
        {topEvents &&
          topEvents.map((event, index) => (
            <div className={styles.details} key={index}>
              <span>{`${event.eventName}:`}</span>
              <span>{`${event.eventCount}`}</span>
            </div>
          ))}
        <Separator.Root className="SeparatorRoot" />
        <div className="card-header">
          <p>{`${label}`}</p>
          <p>Total: {String(payload?.[0]?.value)}</p>
        </div>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
