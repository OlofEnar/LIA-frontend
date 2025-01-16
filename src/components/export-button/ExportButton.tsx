import dayjs from "dayjs";
import { generateCsv, download, mkConfig } from "export-to-csv";
import { useCsvStore, useDateRangeStore } from "../../store";
import { Download } from "lucide-react";
import styles from "./ExportButton.module.scss";

export const ExportButton = () => {
    const { csvData } = useCsvStore();
    const { selectedRange } = useDateRangeStore();
    const fromDate = dayjs(selectedRange.from).format('YYYY-MM-DD')
    const toDate = dayjs(selectedRange.to).format('YYYY-MM-DD')

    const csvConfig = mkConfig({ 
        useKeysAsHeaders: true,
        filename: `${fromDate}-${toDate}-User_events`,    
    });

    const handleExport = () => {
        const csv = generateCsv(csvConfig)(csvData);
        download(csvConfig)(csv);
    };
    
    return (
        <div className={styles.btnContainer}>
            <button className="btn btn-alt" type="button"onClick={handleExport}>
            Export
            </button>
            <Download color="#3c5b99" strokeWidth={1.5} size={14} className={styles.icon} />
        </div>
    )
}
