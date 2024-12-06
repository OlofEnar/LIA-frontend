import DateRangePicker from "../date-range-picker/DateRangePicker";
import ExportMenu from "../export-menu/ExportMenu";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.scss"


const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <div className={styles.headerRight}>
                {/* <ExportMenu /> */}
                <DateRangePicker />
            </div>
        </header>
    );
}
export default Header;