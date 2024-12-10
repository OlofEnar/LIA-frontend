import DateRangePicker from "../date-range-picker/DateRangePicker";
import ExportMenu from "../export-menu/ExportMenu";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.scss"
import * as Separator from "@radix-ui/react-separator";
import OptionsModal from "../options-modal/OptionsModal";


const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <div className={styles.headerRight}>
                <DateRangePicker />
                <Separator.Root className="SeparatorRoot" orientation="vertical" />
                <OptionsModal isGlobal={true}/>
                <ExportMenu />
            </div>
        </header>
    );
}
export default Header;