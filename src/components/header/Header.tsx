import DateRangePicker from "../date-range-picker/DateRangePicker";
import styles from "./Header.module.scss"


const Header = () => {
    return (
        <header className={styles.header}>
            <DateRangePicker />
        </header>
    );
}
export default Header;