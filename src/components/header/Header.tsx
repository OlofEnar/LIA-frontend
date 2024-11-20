import DateRangePicker from "../date-range-picker/DateRangePicker";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.scss"


const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <DateRangePicker />
        </header>
    );
}
export default Header;