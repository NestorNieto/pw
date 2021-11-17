import {BsGithub} from 'react-icons/bs';
import styles from './Footer.module.css';
const Footer = () => {
    return(
        <footer className={styles.footer}>
            <p>Grupo #47</p>
            <BsGithub size={32}/>
            <p>&copy;2021</p>
        </footer>
    );
};

export default Footer;