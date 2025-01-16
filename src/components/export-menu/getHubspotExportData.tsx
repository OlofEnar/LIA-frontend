import { EventDataForExport, User } from '../../types/types';
import {
  aggregateEventsByName,
  filterEvents,
  getEventsTotal,
  packageforHubspotCsv,
} from '../../utils/utils';

export const getHubspotExportData = (
  userIdsToExport: string[],
  selectedDates: string[],
  users: User[]
) => {
  const userMap = new Map(users.map((user) => [user.id, user]));
  const usersToExport: any[] = [];
  const selectedEventNames: string[] = [
    'ApplicationStarted',
    'AssortmentAdded',
    'ChangeMainView',
    'CreatePDFSummary',
    'LoadProjectStandalone',
    'UserLoggedinStandalone',
  ];

  userIdsToExport.forEach((userId) => {
    const user = userMap.get(userId);
    if (!user) return;

    const filteredEvents = filterEvents(
      user.events,
      selectedDates,
      selectedEventNames
    );
    const events = aggregateEventsByName(filteredEvents);

    const exportedUser: EventDataForExport = {
      userId: user.id,
      email: 'place@holder.com',
      totalEvents: getEventsTotal(events),
      events,
    };

    usersToExport.push(packageforHubspotCsv(exportedUser));
  });

  console.log(usersToExport);
  return usersToExport;
};
