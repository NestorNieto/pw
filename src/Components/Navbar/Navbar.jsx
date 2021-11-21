import {HiHome} from 'react-icons/hi'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import { Link } from "react-router-dom";
import { logOut } from '../../Services/Authorization.service';

import styles from './Navbar.module.css';
const Navbar = (props) => {
    const size = 24;
    return (
        <nav className={styles.main_navbar}>
            <ul>
                <Link to = "/"> <HiHome size={size} /> </Link>
                <Link to = "/" onClick={logOut}><RiLogoutBoxRFill size={size}/></Link>
            </ul>
        </nav>
    );
};

export default Navbar;