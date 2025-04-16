import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Separator from '@radix-ui/react-separator';
import styles from './EventPage.module.scss';
import { Settings } from 'lucide-react';
import { useDateRangeStore } from '../../store';
import { formatDateRange } from '../../utils/utils';
import { useAggregatedEventByNameAndDate } from '../../queries/useEventQueries';
import OptionsModal from '../../components/options-modal/OptionsModal';
import { useEffect } from 'react';
import EventBarChart from '../../components/charts/EventBarChart';
import { EventDetailsChart } from '../../components/charts/EventDetailsChart/EventDetailsChart';

const EventPage = () => {
  const { selectedEventName } = useParams<{ selectedEventName: string }>();
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);
  const navigate = useNavigate();

  // Here we need to do a check on a list of valid EventNames.
  // As of now you can pass any string and all the queries will run
  useEffect(() => {
    if (!selectedEventName) {
      navigate('/');
    }
  }, [selectedEventName, navigate]);

  const {
    data: aggregatedResponse,
    error,
    isError,
    isLoading,
  } = useAggregatedEventByNameAndDate(startDate, endDate, selectedEventName!);

  // if (selectedEventName) {
  //   latestActivity = getLatestEventActivity(userEvents, selectedEventName);
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error && isError) {
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
          </p>
          <p>
            <strong>By: </strong>
          </p>
          <p>
            <strong>Total events: </strong>
            {aggregatedResponse?.totalEvents}
          </p>
        </div>
      </div>
      <div className="grid-item box-portrait shadow">
        <div className={styles.cardHeader}>
          <div className="label">Time of day usage</div>
          <OptionsModal isGlobal={false} />
        </div>
        <EventDetailsChart eventName={selectedEventName!} />
      </div>
      <div className="grid-item box-landscape shadow">
        <div className={styles.cardHeader}>
          <div className="label">Event activity: {selectedEventName}</div>
          <Settings size={22} strokeWidth={1.5} />
        </div>
        <EventBarChart chartData={aggregatedResponse?.aggregatedEvents} />
      </div>
    </div>
  );
};
export default EventPage;
