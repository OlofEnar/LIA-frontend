import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './ExportMenu.module.scss';
import { Braces, Columns3, File, Share2 } from 'lucide-react';
import dayjs from 'dayjs';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { useDateRangeStore, useSelectedUsersStore } from '../../store';
import {
  downloadJSON,
  exportJsonToBrowser,
  filterUsers,
  getDateRangeArray,
} from '../../utils/utils';
import { useUsersQuery } from '../../queries/useUserQueries';
import { getHubspotExportData } from './getHubspotExportData';

const ExportMenu = () => {
  const { selectedRange } = useDateRangeStore();
  const { selectedUserIds } = useSelectedUsersStore();
  const fromDate = dayjs(selectedRange?.from).format('YYYY-MM-DD');
  const toDate = dayjs(selectedRange?.to).format('YYYY-MM-DD');
  const selectedDates = getDateRangeArray(
    selectedRange?.from,
    selectedRange?.to
  );
  const fileName = `${fromDate}-${toDate}-User_events`;
  const { data: users = [] } = useUsersQuery();

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: fileName,
  });

  const handleJsonExport = () => {
    const filteredUsers = filterUsers(selectedUserIds, users);
    exportJsonToBrowser(filteredUsers);
  };

  const handleJsonDownload = () => {
    const filteredUsers = filterUsers(selectedUserIds, users);
    downloadJSON({ data: filteredUsers, fileName });
  };

  const handleCsvExport = () => {
    const data = getHubspotExportData(selectedDates, users);
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Share2 size={22} strokeWidth={1.5} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={5}>
          <DropdownMenu.Item className={styles.Item} onClick={handleCsvExport}>
            Export as CSV{' '}
            <div className={styles.RightSlot}>
              <Columns3 strokeWidth={1.5} size={14} className={styles.icon} />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.Item}
            onClick={handleJsonDownload}
          >
            Export as JSON{' '}
            <div className={styles.RightSlot}>
              <File strokeWidth={1.5} size={14} className={styles.icon} />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item} onClick={handleJsonExport}>
            Open JSON in browser{' '}
            <div className={styles.RightSlot}>
              <Braces strokeWidth={1.5} size={14} className={styles.icon} />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default ExportMenu;
