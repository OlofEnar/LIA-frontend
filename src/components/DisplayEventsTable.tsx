'use client'
import { useMemo } from "react";
import { eventColumns } from "./table/columns";
import { UserEvent } from "../types/types";
import DataTable from "./table/DataTable/DataTable";
import { useDateRangeStore } from "../store";
import { getDateRangeArray } from "../utils/utils";
import { useEventsQuery } from "../queries/useEventQueries";

export const DisplayEventsTable = () => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
    const { data: userEvents, error, isError, isLoading } = useEventsQuery();

    const filteredEventData = useMemo(() => {
        if (!userEvents) return [];
        const eventData: UserEvent[] = [];

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
