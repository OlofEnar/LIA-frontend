import styles from "./navbar.module.scss"
import { NavLink } from "react-router-dom";

type LinkItem = {
    path: string;
    label: string;
};

const Navbar = () => {
    const links: LinkItem[] = [
        { path: "/", label: "Home" },
        { path: "/users", label: "Users" },
        { path: "/events", label: "Events" },
    ]

    return (
        <nav className={styles.navbar}>
            {links.map((link) => (
                <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}`: styles.link)}
                >
                {link.label}
                </NavLink>
            ))}
        </nav>
    )
};
export default Navbar;