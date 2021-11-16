import {BsGithub} from 'react-icons/bs';
import styles from './Footer.module.css';
const Footer = () => {
    return(
        <footer className={styles.footer}>
            <p>Grupo #47</p>
            <BsGithub size={32}/>
            <p>2021 &copy;</p>
        </footer>
    );
};

export default Footer;