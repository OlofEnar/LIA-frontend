import { EventDataForExport, User, UserEvent } from "../../types/types";
import { aggregateEventsByName, filterEventsByDateRange, filterEventsByName, getEventTotal, packageforHubspotCsv } from "../../utils/utils";

export const getHubspotExportData = (userIdsToExport: string[], selectedDates: string[], users: User[]) => {
    const usersToExport: Array<Record<string, any>> = [];
    const selectedEventNames: string[] = [
        "ApplicationStarted",
        "AssortmentAdded",
        "ChangeMainView",
        "CreatePDFSummary",
        "LoadProjectStandalone",
        "UserLoggedinStandalone",
    ]
 
    userIdsToExport.forEach(userId => {
        const user: User = users.find((user) => user.id === userId);
        let events: UserEvent[] = [];
        let filteredEvents: UserEvent[] = [];

        if(user) {
            const exportedUser: EventDataForExport = {
                userId: user.id,
                email: "john.doe@mail.com",
                totalEvents: 0,
                events: [],
            };

            filteredEvents = filterEventsByDateRange(selectedDates, user.events); 
            events = aggregateEventsByName(filteredEvents);
            filteredEvents = filterEventsByName(selectedEventNames, events);
            exportedUser.events = filteredEvents;
            exportedUser.totalEvents = getEventTotal(exportedUser.events);
            const convertedUser = packageforHubspotCsv(exportedUser);
            usersToExport.push(convertedUser);
        }
    });
    console.log(usersToExport);
    return usersToExport;
};