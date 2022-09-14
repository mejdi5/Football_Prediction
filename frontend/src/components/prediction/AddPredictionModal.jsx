import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../../Axios"
import styles from './PredictionModal.module.css'
import { getCurrentFixtureUserPredictions } from '../../redux/predictionSlice';


const PredictionModal = ({openAddPredictionModal, setOpenAddPredictionModal, currentMatch, currentFixture}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userSlice.user)
    const [homeTeamScorePrediction, setHomeTeamScorePrediction] = useState(0)
    const [awayTeamScorePrediction, setAwayTeamScorePrediction] = useState(0)

    const handlePredict = (e) => {
        try {
            Axios.post(`/predictions`, {
                userId: user?._id,
                fixtureId: currentFixture?._id,
                matchId: currentMatch?._id,
                homeTeamScorePrediction,
                awayTeamScorePrediction
            })
        } catch (error) {
            console.log(error.message)
        }
        setOpenAddPredictionModal(false)
    }


return (
<Modal isOpen={openAddPredictionModal} toggle={() => setOpenAddPredictionModal(!openAddPredictionModal)}>
    <ModalHeader toggle={() => setOpenAddPredictionModal(!openAddPredictionModal)}>
        <strong className={styles.header}>Match Prediction</strong>
    </ModalHeader>
    <ModalBody>
    <Form className={styles.form}>
    <FormGroup className={styles.formGroup}>
        <Label className={styles.label}>{currentMatch.homeTeam}</Label>
    </FormGroup>
    <FormGroup>
        <input
        type="number"
        className={styles.input}
        value={homeTeamScorePrediction}
        onChange={e => setHomeTeamScorePrediction(e.target.value)}
        min="0"
        />
        <input
        type="number"
        className={styles.input}
        value={awayTeamScorePrediction}
        onChange={e => setAwayTeamScorePrediction(e.target.value)}
        min="0"
        />
    </FormGroup>
    <FormGroup className={styles.formGroup}>
        <Label  className={styles.label}>{currentMatch.awayTeam}</Label>
    </FormGroup>
    </Form>
    <div className={styles.button}>
        <Button 
        onClick={e => !user.isAdmin  && handlePredict(e)} 
        color="primary"
        ><strong className={styles.buttonText}>Submit</strong></Button>
    </div>
    </ModalBody>
</Modal>
)}

export default PredictionModal