import React, {useRef, useState} from 'react'
import styles from "./Home.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Label, FormGroup} from 'reactstrap';
import { Axios } from '../../Axios';
import { getUser } from "../../redux/userSlice"
import Register from '../../components/register/Register';


const Home = () => {

    const email = useRef(null);
    const password = useRef(null)
    const dispatch = useDispatch()
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if(email?.current?.value && password?.current?.value) {
            const res = await Axios.post("/users/login", { 
                email: email?.current?.value,
                password: password?.current?.value
            })
            dispatch(getUser(res.data.user))
            }
        } catch (error) {
            console.log(error)
        }
    }

return (
<div className={styles.container}>
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <h3 className={styles.logo}>Football</h3>
        </div>
        <div className={styles.body}>
            <Form>
                <FormGroup className={styles.form}>
                    <Label className={styles.label}>Email address <span className={styles.required}>*</span></Label>
                    <input 
                    type="email" 
                    //className="form-control"
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
                    //className="form-control"
                    className={styles.input}
                    ref={password}
                    />
                </FormGroup>
                <div className={styles.button}>
                    <Button
                    color="success"
                    onClick={e => handleLogin(e)}
                    ><strong className={styles.login}>Login</strong></Button>
                </div>
            </Form>
        </div>
        <div className={styles.footer}>
            <Button 
            onClick={() => setShowRegisterModal(true)}
            color="primary" 
            size="lg" 
            block><strong className={styles.register}>Register</strong></Button>
            <Register
            showRegisterModal={showRegisterModal}
            setShowRegisterModal={setShowRegisterModal}
            />
        </div>
    </div>
</div>
)}

export default Home