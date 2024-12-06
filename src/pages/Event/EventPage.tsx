import * as Separator from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";
import styles from "./eventpage.module.scss"
import { Settings } from "lucide-react";
import { useDateRangeStore, useUserCountStore } from "../../store";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getEvents } from "../../services/api";
import { UserEvent } from "../../types/types";
import { getDateRangeArray, getLatestEventActivity } from "../../utils/utils";
import EventBarChart from "../../components/charts/EventBarChart";

const EventPage = () => {
    const { selectedEventName } = useParams<{ selectedEventName: string }>();
    const { selectedRange } = useDateRangeStore();
    const { setUserCount } = useUserCountStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
  
    const { data: userEvents, error, isError, isLoading, } = useQuery<UserEvent[]>({ 
      queryKey: ['userEvents'], 
      queryFn: () => getEvents(),    
    });

    const latestActivity: string = getLatestEventActivity(userEvents,selectedEventName)
    let chartData: UserEvent[] = [];
    const eventMap = new Map();
    const uniqueUsers = new Set<string>();
    let userCount: number = 0;
    
    userEvents?.forEach((userEvent) => {
      const { date, eventCount, eventName, userId } = userEvent;
      const key = `${date}-${eventName}`;
    
      if (eventMap.has(key)) {
        eventMap.get(key).eventCount += eventCount;
      } else {
        eventMap.set(key, { ...userEvent });
      }
    
      if (eventName === selectedEventName && selectedDates.includes(date)) {
        uniqueUsers.add(userId);
      }
    });

    chartData = selectedDates.map((date) => {
      const key = `${date}-${selectedEventName}`;
      return eventMap.get(key);
    }).filter(event => event !== undefined);

    userCount = uniqueUsers.size;
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
   useEffect(() => {
    setUserCount(userCount);
    console.log(`${userCount} unique users on ${selectedEventName}`);
  }, [userCount, setUserCount, selectedEventName]);
  
    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <div className={styles.single}>
        <div className="grid-item box-portrait shadow">
            <div className="card-header">
                <div className="label">{selectedEventName}</div>
            </div>
            <Separator.Root className="SeparatorRoot" />
            <div className={styles.cardDetails}>
            <p><strong>Last logged: </strong>{latestActivity}</p>
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
                <div className="label">Event activity: {selectedEventName}</div>
                <div className="label">Unique users: {userCount}</div>
                <Settings size={22} strokeWidth={1.5}/>
            </div>
            <EventBarChart chartData={chartData}/>
        </div>
    </div>
    );
};
export default EventPage;