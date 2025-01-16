import UserActivityLineChart from '../../components/charts/UserActivityLineChart/UserActivityLineChart';
import * as Separator from '@radix-ui/react-separator';
import { useParams } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { FlagTriangleRight, Settings2 } from 'lucide-react';
import { getLatestUserActivity } from '../../utils/utils';
import { DisplayUserEventTable } from '../../components/table/DisplayUserEventsTable';
import { useUserQuery } from '../../queries/useUserQueries';

const UserPage = () => {
  const { id } = useParams<{ id: string | any }>();

  const { data: user, error, isError, isLoading } = useUserQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  const latestActivity: string | null = getLatestUserActivity(user?.events);

  return (
    <div className={styles.single}>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">User info</div>
          <FlagTriangleRight
            fill="green"
            size={22}
            strokeWidth={1.5}
            color="green"
          />
        </div>
        <Separator.Root className="SeparatorRoot" />
        <div className={styles.cardDetails}>
          <p>
            <strong>Id:</strong> {user?.id.toString().slice(0, 4)}
          </p>
          <p>
            <strong>Score: </strong>
            {user?.score}
          </p>
          <p>
            <strong>Last active: </strong>
            {latestActivity}
          </p>
          <p>
            <strong>Total events: </strong>
            {user?.totalEvents}
          </p>
        </div>
      </div>
      <div className="grid-item box-portrait shadow">
        <div className="cardHeader">
          <div className="label">Events</div>
          <Settings2 size={22} strokeWidth={1.5} />
        </div>
        <DisplayUserEventTable userId={id} />
      </div>
      <div className="grid-item box shadow">
        <UserActivityLineChart userId={id} />
      </div>
    </div>
  );
};
export default UserPage;
