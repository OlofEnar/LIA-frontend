import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./ExportMenu.module.scss";
import { Braces, Columns3, File, Share2 } from "lucide-react";
import dayjs from "dayjs";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useCsvStore, useDateRangeStore, useSelectedUsersStore } from "../../store";
import { downloadJSON, exportJsonToBrowser, getDateRangeArray } from "../../utils/utils";
import { useUsersQuery } from "../../queries/useUserQueries";
import { getHubspotExportData } from "./getHubspotExportData";

const ExportMenu = () => {	
	const { exportData } = useCsvStore();
    const { selectedRange } = useDateRangeStore();
	const { selectedUserIds } = useSelectedUsersStore();
    const fromDate = dayjs(selectedRange.from).format('YYYY-MM-DD');
    const toDate = dayjs(selectedRange.to).format('YYYY-MM-DD');
	const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
	const fileName = `${fromDate}-${toDate}-User_events`;
	const { data: users = [] } = useUsersQuery();
	
    const csvConfig = mkConfig({ 
        useKeysAsHeaders: true,
        filename: fileName,    
    });

    const handleExport = () => {
        const csv = generateCsv(csvConfig)(exportData);
        download(csvConfig)(csv);
    };
	
 	const handleHubspotExport = () => {
 		const data = getHubspotExportData(selectedUserIds, selectedDates, users);
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv); 
    };

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Share2 size={22} strokeWidth={1.5}/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className={styles.Content} sideOffset={5}>
				<DropdownMenu.Item className={styles.Item} onClick={handleHubspotExport}>
					Export HUBSPOT <div className={styles.RightSlot}>
						<Columns3  strokeWidth={1.5} size={14} className={styles.icon} /></div>
				</DropdownMenu.Item>
					<DropdownMenu.Item className={styles.Item} onClick={handleExport}>
						Export as CSV <div className={styles.RightSlot}>
							<Columns3  strokeWidth={1.5} size={14} className={styles.icon} /></div>
					</DropdownMenu.Item>
					<DropdownMenu.Item className={styles.Item} onClick={() => downloadJSON({data: exportData, fileName})}>
					Export as JSON <div className={styles.RightSlot} >
					<File strokeWidth={1.5} size={14} className={styles.icon} />
							</div>
					</DropdownMenu.Item>
					<DropdownMenu.Item className={styles.Item} onClick={() => exportJsonToBrowser({data: exportData})}>
					Open JSON in browser <div className={styles.RightSlot} >
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