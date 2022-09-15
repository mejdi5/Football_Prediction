import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styles from './UsersModal.module.css'
import { Axios } from '../../Axios'

const UsersModal = ({openUsersModal, setOpenUsersModal}) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userSlice.users)
    const navigate = useNavigate()

    const handleDeleteUser = async (id) => {
        try {
            await Axios.delete(`/users/${id}`)
        } catch (error) {
            console.log(error)
        }
        setOpenUsersModal(false)
    }


return (
    <Modal isOpen={openUsersModal} toggle={() => setOpenUsersModal(!openUsersModal)}>
        <ModalHeader toggle={() => setOpenUsersModal(!openUsersModal)}>Users</ModalHeader>
        <ModalBody>
            {users.filter(user => !user.isAdmin).map(user => 
                <div key={user?._id} className={styles.user}>
                    <h5>{user.name}</h5>
                    <button 
                    className={styles.button}
                    onClick={() => {
                        navigate(`/predictions/${user?._id}`)
                        setOpenUsersModal(false);
                        window.location.reload()
                    }}
                    >See Predictions</button>
                    <button
                    onClick={() => handleDeleteUser(user?._id)} 
                    >Delete</button>
                </div>
            )}
        </ModalBody>
    </Modal>
)}

export default UsersModal