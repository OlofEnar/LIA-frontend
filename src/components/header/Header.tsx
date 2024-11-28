import DateRangePicker from "../date-range-picker/DateRangePicker";
import { ExportButton } from "../export-button/ExportButton";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.scss"


const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <div className={styles.headerRight}>
                <ExportButton />
                <DateRangePicker />
            </div>
        </header>
    );
}
export default Header;