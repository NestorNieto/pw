import { Link } from "react-router-dom";
import { logOut } from "../../Services/Helper";
import styles from './Navbar.module.css';
const Navbar = (props) => {
    return (
        <nav className={styles.main_navbar}>
            <ul>
                <Link to = "/">Home</Link>
                <Link to = "/" onClick={logOut}>Log Out</Link>
            </ul>
        </nav>
    );
};

export default Navbar;