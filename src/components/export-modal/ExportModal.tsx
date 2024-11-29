import * as Dialog from "@radix-ui/react-dialog";
import styles from "./exportModal.module.scss";
import dayjs from "dayjs";
import { generateCsv, download, mkConfig } from "export-to-csv";
import { useCsvStore, useDateRangeStore } from "../../store";
import { Download } from "lucide-react";

const ExportModal = () => {
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
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className={styles.btnContainer}>
                    <button className="btn btn-alt" type="button">
                    Export
                    </button>
                    <Download color="#3c5b99" strokeWidth={1.5} size={14} className={styles.icon} />
                </div>            
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Content}>
                    <Dialog.Title className={styles.Title}>Export options</Dialog.Title>
                    <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                        <Dialog.Close asChild>
                            <button className="btn btn-alt" aria-label="Close">Cancel</button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button onClick={handleExport} className="btn btn-primary">Export</button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
export default ExportModal;