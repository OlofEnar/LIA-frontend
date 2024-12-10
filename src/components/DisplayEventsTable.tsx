'use client'
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getEvents } from "../services/api";
import { eventColumns } from "./table/columns";
import { EventNames, UserEvent } from "../types/types";
import DataTable from "./table/DataTable/DataTable";
import { useDateRangeStore } from "../store";
import { getDateRangeArray } from "../utils/utils";

export const DisplayEventsTable = () => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
    const { data: userEvents, error, isError, isLoading } = useQuery<UserEvent[]>({
        queryKey: ['eventsTable'],
        queryFn: getEvents
    });

    const filteredEventData = useMemo(() => {
        if (!userEvents) return [];
        const eventData: EventNames[] = [];

        selectedDates.forEach((date) => {
            const events = userEvents.filter((event) => event.date === date);
            if (events.length > 0) {
                eventData.push(...events);
            }
        });

        return Array.from(eventData.reduce((map, cur) => {
            const name = cur.eventName;

            if (map.has(name)) {
                const existingEvent = map.get(name);
                existingEvent.eventCount += cur.eventCount;
            } else {
                map.set(name, { ...cur });
            }
            
            return map;
        }, new Map<string, EventNames>()).values());
    }, [selectedDates, userEvents]);

    console.log(filteredEventData);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <>
            <DataTable columns={eventColumns} data={filteredEventData} />
        </>
    );
};
