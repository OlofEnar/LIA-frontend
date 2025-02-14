import './Dashboard.scss';
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';
import { DisplayDashboardTable } from '../../components/table/DashboardTable/DisplayDashboardTable';
import EventsBarChart from '../../components/EventsBarChart/EventsBarChart';
import { useUsersQuery } from '../../queries/useUserQueries';
import DataTable from '../../components/table/DataTable/DataTable';
import { userColumns } from '../../components/table/columns';

const Dashboard = () => {
  const { data: users = [], error, isError, isLoading } = useUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <div className="dashboard">
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Total events</div>
          <Activity size={18} />
        </div>
        <span className="summary">76K</span>
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
        <EventsBarChart />
      </div>
      <div className="grid-item box-landscape shadow">
        <DataTable
          customPageSize={5}
          columns={userColumns}
          data={users}
          tableType={'users'}
          showSearch={false}
        />
      </div>
    </div>
  );
};
export default Dashboard;
