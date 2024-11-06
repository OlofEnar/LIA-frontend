import "./dashboard.scss"
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';
import { DisplayDashboardTable } from "../../components/DisplayDashboardTable";
import UserActivityLineChart from "../../components/charts/UserActivityLineChart";
import EventsBarChart from "../../components/charts/EventsBarChart";


const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="grid-item box shadow">
                <div className="card-header">
                    <div className="label">Total events</div>
                    <Activity size={18}/>
                </div>
                <span className="summary">76K</span>
            </div>
            <div className="grid-item box shadow">
                <div className="label">Some data</div>
                <span className="summary">32</span>
            </div>
            <div className="grid-item box shadow">
                    <div className="card-header">
                        <div className="label">Users yesterday</div>
                        <ArrowUp color="green" size={18}/>
                    </div>
                <span className="summary">54</span>
            </div>
            <div className="grid-item box shadow">
                <div className="card-header">
                    <div className="label">Active users</div>
                    <ArrowDown color="red" size={18} />
                </div>
                <span className="summary">34</span>
            </div>
            {/* <div className="grid-item box-landscape shadow"> <EventsBarChart /></div> */}
            <div className="grid-item box-landscape shadow"> <UserActivityLineChart /></div>
            <div className="grid-item box-landscape shadow"><DisplayDashboardTable /></div>
        </div>
    );
}
export default Dashboard;