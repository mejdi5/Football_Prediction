import React, {useState} from 'react'
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { logoutUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import UsersModal from '../users/UsersModal';


const Sidebar = () => {

    const user = useSelector(state => state.userSlice.user)
    const dispatch = useDispatch()
    const [openUsersModal, setOpenUsersModal] = useState(false)

    const handleLogout = () => {
        dispatch(logoutUser())
    }
    

return (
<div className={styles.container}>
<div className={styles.body}>
    <div className={styles.header}>
        <h3 className={styles.name}>{user.name?.toUpperCase()}</h3>
    </div>
    <ul className={styles.links}>
    <div>
        <Link to="/"className={styles.link}>
        <li className={styles.li}>
            <span 
            className={styles.item}
            >Dashboard</span>
        </li>
        </Link>
        {!user.isAdmin 
        ? 
        <Link to={`/predictions/${user?._id}`} className={styles.link}>
        <li className={styles.li}>
            <span 
            className={styles.item}
            >Predictions</span>
        </li>
        </Link>
        :
        <li className={styles.li} onClick={() => setOpenUsersModal(true)}>
            <span 
            className={styles.item}
            >Users</span>
            {openUsersModal && 
            <UsersModal
            openUsersModal={openUsersModal}
            setOpenUsersModal={setOpenUsersModal}
            />
            }
        </li>
        }
        <Link to="/results"className={styles.link}>
        <li className={styles.li}>
            <span 
            className={styles.item}
            >Results</span>
        </li>
        </Link>
        <Link to="/standing"className={styles.link}>
        <li className={styles.li}>
            <span 
            className={styles.item}
            >Standings</span>
        </li>
        </Link>
        <li onClick={handleLogout} className={styles.li}>
            <span className={styles.item}>Logout</span>
        </li>
    </div>
    </ul>
</div>
</div>
)}

export default Sidebar