import styles from './ControlBar.module.css'
import { useState } from 'react';
import {AiFillEyeInvisible, AiFillEye, AiFillEdit} from 'react-icons/ai'

export const ControlBar = ({ isAdmin = false }) => {
    const handleToggle = () =>{ setVisibility(!visibility)}
    const size = 24;
    const [visibility, setVisibility] = useState(false);
    const eyeIcon = visibility ? <AiFillEye size={size} /> : <AiFillEyeInvisible size={size} />;
    const editIcon = <AiFillEdit size={size} />
    return (
        <div className={styles.action}>
            <button onClick={handleToggle}>{eyeIcon} {visibility? "Visible" : "Invisible"} </button>
            <button>{editIcon} Edit Post </button>
        </div>
    )

};