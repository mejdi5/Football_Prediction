import React, {useRef, useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import styles from './Register.module.css'
import { useDispatch } from 'react-redux'
import { Axios } from "../../Axios"
import { getUser } from '../../redux/userSlice';


const Register = ({showRegisterModal, setShowRegisterModal}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const email = useRef(null);
    const password = useRef(null)

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                name,  
                email: email?.current?.value,
                password: password?.current?.value
            }
            const res = await Axios.post('/users/register', newUser)
            dispatch(getUser(res.data.savedUser))
        } catch (error) {
            console.log(error)
        }
    }

return (
    <Modal isOpen={showRegisterModal} toggle={() => setShowRegisterModal(!showRegisterModal)}>
    <ModalHeader toggle={() => setShowRegisterModal(!showRegisterModal)}>
        <span className={styles.header}>Sign Up</span>
    </ModalHeader>
    <ModalBody>
    <Form>
    <FormGroup className={styles.form}>
        <Label className={styles.label}>Name <span className={styles.required}>*</span></Label> 
        <input 
        type="text" 
        className={styles.input}
        placeholder="User Name.."
        onChange={e => setName(e.target.value)}
        required
        />
    </FormGroup>
    <FormGroup className={styles.form}>
        <Label className={styles.label}>Email address <span className={styles.required}>*</span></Label>
        <input 
        type="email" 
        className={styles.input}
        placeholder="email.."
        ref={email}
        required
        />
    </FormGroup>
    <FormGroup className={styles.form}>
        <Label className={styles.label}>Password <span className={styles.required}>*</span></Label>
        <input 
        type="password" 
        placeholder="Password.."
        required 
        className={styles.input}
        ref={password}
        />
    </FormGroup>
    
    <div className={styles.formFooter}>
        <Button 
        onClick={e => handleRegister(e)}
        color="primary"
        ><strong className={styles.button}>Submit</strong></Button>
    </div>
    </Form>
    </ModalBody>
</Modal>
)}

export default Register