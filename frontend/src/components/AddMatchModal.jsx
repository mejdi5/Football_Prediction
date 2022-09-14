import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../Axios"



const AddMatchModal = ({showAddMatchModal, setShowAddMatchModal, fixture}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userSlice.user)
    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")

    const handleAddMatch = (e) => {
        try {
            Axios.put(`/fixtures/add-match/${fixture?._id}`, {
                homeTeam,
                awayTeam,
                fixtureNumber: fixture.fixtureNumber,
            })
        } catch (error) {
            console.log(error)
        }
        setShowAddMatchModal(false)
    }


return (
    <Modal isOpen={showAddMatchModal} toggle={() => setShowAddMatchModal(!showAddMatchModal)}>
    <ModalHeader toggle={() => setShowAddMatchModal(!showAddMatchModal)}>New Match</ModalHeader>
    <ModalBody>
    <Form>
    <div style={{display:'flex', gap: '10px', marginBottom:'10px'}}>
        <Label>Fixture</Label>
        <span>{fixture?.fixtureNumber}</span>
    </div>
    <FormGroup>
        <Label>Home Team</Label>
        <input 
        type="text" 
        className="form-control"
        placeholder="home team.."
        onChange={e => setHomeTeam(e.target.value)}
        required
        />
    </FormGroup>
    <FormGroup>
        <Label>Away Team</Label>
        <input 
        type="text" 
        className="form-control"
        placeholder="away team.."
        onChange={e => setAwayTeam(e.target.value)}
        required
        />
    </FormGroup>
        <Button 
        onClick={e => user.isAdmin && handleAddMatch(e)}
        color="primary"
        >Submit</Button>
    </Form>
    </ModalBody>
</Modal>
)}

export default AddMatchModal