import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../../Axios"
import styles from './PredictionModal.module.css'


const EditPredictionModal = ({openEditPredictionModal, setOpenEditPredictionModal, currentMatch, currentFixture, currentPrediction}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userSlice.user)
    const [homeTeamScorePrediction, setHomeTeamScorePrediction] = useState(currentPrediction?.homeTeamScorePrediction)
    const [awayTeamScorePrediction, setAwayTeamScorePrediction] = useState(currentPrediction?.awayTeamScorePrediction)

    const handleChangePrediction = (e) => {
        try {
            Axios.put(`/predictions/${currentPrediction?._id}`, {
                userId: user?._id,
                fixtureId: currentFixture?._id,
                matchId: currentMatch?._id,
                homeTeamScorePrediction,
                awayTeamScorePrediction
            })
        } catch (error) {
            console.log(error)
        }
        setOpenEditPredictionModal(false)
    }


return (
<Modal isOpen={openEditPredictionModal} toggle={() => setOpenEditPredictionModal(!openEditPredictionModal)}>
    <ModalHeader toggle={() => setOpenEditPredictionModal(!openEditPredictionModal)}>
        <strong className={styles.header}>Change Prediction</strong>
    </ModalHeader>
    <ModalBody>
    <Form className={styles.form}>
    <FormGroup className={styles.formGroup}>
        <Label className={styles.label}>{currentMatch.homeTeam}</Label>
    </FormGroup>
    <FormGroup className={styles.formGroup}>
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
        <Label className={styles.label}>{currentMatch.awayTeam}</Label>
    </FormGroup>
    </Form>
    <div className={styles.button}>
        <Button 
        onClick={e => !user.isAdmin  && handleChangePrediction(e)}
        color="primary"
        ><strong className={styles.buttonText}>Submit</strong></Button>
    </div>
    </ModalBody>
</Modal>
)}

export default EditPredictionModal