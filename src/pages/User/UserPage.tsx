import UserActivityLineChart from "../../components/charts/UserActivityLineChart";
import * as Separator from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";
import styles from "./userpage.module.scss"
import { getUser } from "../../services/api";
import { useQuery } from "react-query";
import { User } from "../../types/types";
import { Settings } from "lucide-react";
import UserEventsPieChart from "../../components/charts/user-event-pie-chart/UserEventsPieChart";

const UserPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: user, error, isError, isLoading, } = useQuery<User>({ 
        queryKey: ['user', id], 
        queryFn: () => getUser(id),
        enabled: !!id,    
      });

    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <div className={styles.single}>
        <div className="grid-item box-portrait shadow">
            <div className="card-header">
                <div className="label">User info</div>
                <button className="btn btn-primary">Open in admin</button>
            </div>
            <Separator.Root className="SeparatorRoot" />
            <div className={styles.cardDetails}>
            <p><strong>Id:</strong> {user?.id.toString().slice(0,4)}</p>
            <p><strong>Score: </strong>{user?.score}</p>
            <p><strong>Last active: </strong>Yesterday</p>
            <p><strong>Total events: </strong>34298</p>
            </div>
        </div>
        <div className="grid-item box-portrait shadow">
            <div className={styles.cardHeader}>
                <div className="label">Events summary</div>
                <Settings size={22} strokeWidth={1.5}/>
            </div>
            <UserEventsPieChart userId={id}/>
            <p>[ Add Top 3 here ]</p>
        </div>
        <div className="grid-item box-landscape shadow">
            <div className={styles.cardHeader}>
                <div className="label">User activity</div>
                <Settings size={22} strokeWidth={1.5}/>
            </div>
            <UserActivityLineChart userId={id}/>
        </div>
    </div>
    );
}
export default UserPage;