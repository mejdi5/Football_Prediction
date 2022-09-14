import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../../Axios"
import styles from './ScoreModal.module.css'
import { getAllFixtures } from '../../redux/fixtureSlice';

const ScoreModal = ({openScoreModal, setOpenScoreModal, currentMatch, currentFixture}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userSlice.user)
    const [homeTeamScore, setHomeTeamScore] = useState(0)
    const [awayTeamScore, setAwayTeamScore] = useState(0)


    const handleSetScore = async (e) => {
        e.preventDefault();
        try {
            await Axios.put(`/fixtures/${currentFixture?._id}/${currentMatch?._id}`, {
                homeTeamScore,
                awayTeamScore,
            })
            const res = await Axios.get(`/fixtures`)
            dispatch(getAllFixtures(res.data))
        } catch (error) {
            console.log(error)
        }
        setOpenScoreModal(false)
    }


return (
<div className={styles.container}>
    <Modal isOpen={openScoreModal} toggle={() => setOpenScoreModal(!openScoreModal)}>
    <ModalHeader toggle={() => setOpenScoreModal(!openScoreModal)}>Match Score</ModalHeader>
    <ModalBody>
    <Form className={styles.form}>
    <FormGroup className={styles.formGroup}>
        <Label  className={styles.label}>{currentMatch.homeTeam}</Label>
        <input 
        type="number" 
        className={styles.input} 
        value={homeTeamScore}
        onChange={e => setHomeTeamScore(e.target.value)}
        min="0"
        required
        />
    </FormGroup>
    <FormGroup className={styles.formGroup}>
        <input 
        type="number" 
        className={styles.input}
        value={awayTeamScore}
        onChange={e => setAwayTeamScore(e.target.value)}
        min="0"
        required
        />
        <Label  className={styles.label}>{currentMatch.awayTeam}</Label>
    </FormGroup>
    </Form>
    <div className={styles.button}>
        <Button 
        onClick={e => user.isAdmin && handleSetScore(e)}
        color="primary"
        >Submit</Button>
    </div>
    </ModalBody>
</Modal>
</div>
)}

export default ScoreModal