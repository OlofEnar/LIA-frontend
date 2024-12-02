'use client'
import { useQuery } from "react-query";
import { getEvents } from "../services/api"
import { eventColumns } from "./table/columns"
import { EventNames, UserEvent } from "../types/types";
import DataTable from "./table/DataTable/DataTable";
import { useDateRangeStore } from "../store";
import getDateRangeArray from "../utils/getDateRangeArray";


export const DisplayEventsTable = () => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to)
    const { data = [], error, isError, isLoading, } = useQuery<UserEvent[]>({ queryKey: ['userEvents'], queryFn: getEvents });
    const eventData: EventNames[] = [];

        selectedDates.forEach((date) => {
            const events = data.filter((event) => event.date === date);
            if (events.length > 0) {
            eventData.push(...events);
            }
        });
     
        const filteredEventData = Array.from(eventData.reduce((map, cur) => {
        const name = cur.eventName;
       
        if (map.has(name)) {
            console.log(`Found existing event: ${name}, adding count: ${cur.eventCount}`);
            const existingEvent = map.get(name);
            existingEvent.eventCount += cur.eventCount;
            console.log(`Updated event count for ${name}: ${existingEvent.eventCount}`);
        } else {
            console.log(`Adding new event: ${name} with count: ${cur.eventCount}`);
            map.set(name, { ...cur });
        }  
        return map;
        }, new Map()).values());
     
     console.log('Final output:', filteredEventData);

    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <>
        <DataTable columns={eventColumns} data={filteredEventData} />
        </>
    )
}