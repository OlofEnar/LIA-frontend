import './Dashboard.scss';
import { ArrowDown, ArrowUp, Activity, Settings2 } from 'lucide-react';
import EventsBarChart from '../../components/EventsBarChart/EventsBarChart';
import { useAllUsersWithAggregatedEvents } from '../../queries/useUserQueries';
import DataTable from '../../components/table/DataTable/DataTable';
import { userColumns } from '../../components/table/columns';
import { formatDateRange } from '../../utils/utils';
import { useDateRangeStore } from '../../store';
import { format } from 'd3-format';

const Dashboard = () => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);
  const { data, error, isError, isLoading } = useAllUsersWithAggregatedEvents(
    startDate,
    endDate
  );

  const total: number = data?.totalEvents;
  const allEventsTotal =
    total < 10000 ? total.toString() : format('.3s')(total).toLocaleUpperCase();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error && isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <div className="dashboard">
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Total events</div>
          <Activity size={18} />
        </div>
        <span className="summary">{allEventsTotal}</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Some data</div>
        </div>
        <span className="summary">32</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Users yesterday</div>
          <ArrowUp color="green" size={18} />
        </div>
        <span className="summary">54</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Active users</div>
          <ArrowDown color="red" size={18} />
        </div>
        <span className="summary">34</span>
      </div>
      <div className="grid-item box-landscape shadow">
        <div className="cardHeader">
          <div className="label">Events</div>
          <Settings2 size={22} strokeWidth={1.5} />
        </div>
        <EventsBarChart />
      </div>
      <div className="grid-item box-landscape shadow">
        <div className="cardHeader">
          <div className="label">Users</div>
          <Settings2 size={22} strokeWidth={1.5} />
        </div>
        <DataTable
          customPageSize={10}
          columns={userColumns()}
          data={data?.aggregatedUsers}
          tableType="user"
          showTotalFooter={false}
          showSearch={false}
          showTableFooter={false}
        />
      </div>
    </div>
  );
};
export default Dashboard;
