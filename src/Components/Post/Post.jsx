import { ControlBar } from '../ControlBar/ControlBar';
import styles from './Post.module.css';

const Post = ({ data }) => {

    return (
        <div className={styles.post}>
            <h2>{data.title}<span>{data.user?.username}</span></h2>
            <p>{data.description}</p>
            {data.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={data.image} alt="Post " />
                </div>}
            <ControlBar />
        </div>
    )
};

export default Post;