import * as Separator from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";
import styles from "./eventpage.module.scss"
import { Settings } from "lucide-react";
import EventBarChart from "../../components/charts/EventBarChartOLD";
import { useUserCountStore } from "../../store";

const EventPage = () => {
    const { eventName } = useParams<{ eventName: string }>();
    const { userCount } = useUserCountStore();

    return (
        <div className={styles.single}>
        <div className="grid-item box-portrait shadow">
            <div className="card-header">
                <div className="label">{eventName}</div>
            </div>
            <Separator.Root className="SeparatorRoot" />
            <div className={styles.cardDetails}>
            <p><strong>Last logged: </strong>Yesterday</p>
            <p><strong>Total events: </strong>34298</p>
            </div>
        </div>
        <div className="grid-item box-portrait shadow">
            <div className={styles.cardHeader}>
                <div className="label">Top 5 dates?</div>
                <Settings size={22} strokeWidth={1.5}/>
            </div>
        </div>
        <div className="grid-item box-landscape shadow">
            <div className={styles.cardHeader}>
                <div className="label">Event activity: {eventName}</div>
                <div className="label">Unique users: {userCount}</div>
                <Settings size={22} strokeWidth={1.5}/>
            </div>
            <EventBarChart selectedEventName={eventName}/>
        </div>
    </div>
    );
};
export default EventPage;