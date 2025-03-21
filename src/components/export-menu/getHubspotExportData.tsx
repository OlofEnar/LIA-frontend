import { User } from '../../types/types';
import {
  aggregateEventsByName,
  filterEvents,
  getEventsTotal,
} from '../../utils/utils';

export const getHubspotExportData = (
  selectedDates: string[],
  users: User[]
) => {
  const selectedEventNames = [
    'ApplicationStarted',
    'AssortmentAdded',
    'ChangeMainView',
    'CreatePDFSummary',
    'LoadProjectStandalone',
    'UserLoggedinStandalone',
  ];

  const exports = users.map((user) => {
    const packagedEvents: Record<string, number> = {};
    selectedEventNames.forEach((name) => {
      packagedEvents[name] = 0;
    });

    const filteredEvents = filterEvents(
      user.events,
      selectedDates,
      selectedEventNames
    );
    const aggregatedEvents = aggregateEventsByName(filteredEvents);

    aggregatedEvents.forEach((event) => {
      if (event.eventName !== undefined) {
        packagedEvents[event.eventName] = event.eventTotal;
      }
    });

    return {
      unityId: user.id,
      totalSumma: getEventsTotal(aggregatedEvents),
      ...packagedEvents,
    };
  });

  return exports.sort((a, b) => (a.totalSumma < b.totalSumma ? 1 : -1));
};
