'use client'
import { useMemo } from "react";
import { eventColumns } from "./table/columns";
import { UserEvent } from "../types/types";
import DataTable from "./table/DataTable/DataTable";
import { useDateRangeStore } from "../store";
import { aggregateEventsByName, filterEventsByDateRange, getDateRangeArray } from "../utils/utils";
import { useEventsQuery } from "../queries/useEventQueries";

export const DisplayEventsTable = () => {
    const { selectedRange } = useDateRangeStore();
    const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
    const { data: userEvents, error, isError, isLoading } = useEventsQuery();

    const filteredEventData = useMemo(() => {
        if (!userEvents) return [];
        const eventData: UserEvent[] = filterEventsByDateRange(selectedDates, userEvents);

        return aggregateEventsByName(eventData);
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
