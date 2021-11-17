import styles from './Notification.module.css';

const Notification = ({message = "Ha ocurrido un error"}) => {
    return (
        <div className = {styles.container}>{message}</div>
    );
};

export default Notification;