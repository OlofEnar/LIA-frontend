import * as Separator from '@radix-ui/react-separator';
import { Link, useParams } from 'react-router-dom';
import styles from './EventPage.module.scss';
import { Settings } from 'lucide-react';
import { useDateRangeStore } from '../../store';
import { AggregatedEventData, UserEvent } from '../../types/types';
import {
  aggregateEventsByDate,
  filterEvents,
  getDateRangeArray,
  getEventsTotal,
  getLatestEventActivity,
  getUserCount,
} from '../../utils/utils';
import EventBarChart from '../../components/charts/EventBarChart';
import { useEventsByName } from '../../queries/useEventQueries';
import OptionsModal from '../../components/options-modal/OptionsModal';
import { EventDetailsChart } from '../../components/charts/EventDetailsChart/EventDetailsChart';
import dayjs from 'dayjs';

const EventPage = () => {
  const { selectedEventName } = useParams<{ selectedEventName: string }>();
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  let userCount: number = 0;
  let chartData: AggregatedEventData[] = [];
  let filteredEvents: UserEvent[] = [];
  let latestActivity: UserEvent | null = null;

  const {
    data: userEvents,
    error,
    isError,
    isLoading,
  } = useEventsByName(selectedEventName);

  if (selectedEventName) {
    latestActivity = getLatestEventActivity(userEvents, selectedEventName);
  }

  filteredEvents = filterEvents(userEvents, selectedDates);
  userCount = getUserCount(filteredEvents);
  chartData = aggregateEventsByDate(filteredEvents);
  const eventCount = getEventsTotal(chartData);

  chartData.sort((a, b) => {
    const dateA = a.date ? dayjs(a.date).valueOf() : 0;
    const dateB = b.date ? dayjs(b.date).valueOf() : 0;
    return dateA - dateB;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <div className={styles.single}>
      <div className="grid-item box-portrait shadow">
        <div className="card-header">
          <div className="label">{selectedEventName}</div>
        </div>
        <Separator.Root className="SeparatorRoot" />
        <div className={styles.cardDetails}>
          <p>
            <strong>Last logged: </strong>
            {latestActivity?.date}
          </p>
          <p>
            <strong>By: </strong>
            <Link to={`/users/${latestActivity?.userId}`}>
              {latestActivity?.userId}
            </Link>
          </p>
          <p>
            <strong>Total events: </strong>
            {eventCount}
          </p>
        </div>
      </div>
      <div className="grid-item box-portrait shadow">
        <div className={styles.cardHeader}>
          <div className="label">Time of day usage</div>
          <OptionsModal isGlobal={false} />
        </div>
        <EventDetailsChart userEvents={filteredEvents} />
      </div>
      <div className="grid-item box-landscape shadow">
        <div className={styles.cardHeader}>
          <div className="label">Event activity: {selectedEventName}</div>
          <div className="label">Unique users: {userCount}</div>
          <Settings size={22} strokeWidth={1.5} />
        </div>
        <EventBarChart chartData={chartData} />
      </div>
    </div>
  );
};
export default EventPage;
