import styles from './Notification.module.css';

const Notification = ({message}) => {
    if(message){
        return <div className = {styles.container}>{message}</div>;
    }
    else{
        return null;
    }
};

export default Notification;