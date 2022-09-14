import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../Axios"



const AddFixtureModal = ({showAddFixtureModal, setShowAddFixtureModal}) => {

    const dispatch = useDispatch()
    const fixtures = useSelector(state => state.fixtureSlice.fixtures)
    const user = useSelector(state => state.userSlice.user)
    const [deadline, setDeadline] = useState()

    const handleAddFixture = (e) => {
        try {
            Axios.post(`/fixtures`, {
                fixtureNumber: fixtures[fixtures.length - 1]?.fixtureNumber + 1 || 1,
                deadline, 
            })
        } catch (err) {
            console.log(err)
        }
        setShowAddFixtureModal(false)
    }

return (
    <Modal isOpen={showAddFixtureModal} toggle={() => setShowAddFixtureModal(!showAddFixtureModal)}>
    <ModalHeader toggle={() => setShowAddFixtureModal(!showAddFixtureModal)}>New Fixture</ModalHeader>
    <ModalBody>
    <Form>
    <FormGroup>
        <Label style={{marginRight: '5px'}}>Fixture:</Label>
        <span>{fixtures[fixtures?.length - 1]?.fixtureNumber + 1 || 1}</span>
    </FormGroup>
    <FormGroup>
        <Label>DeadLine</Label>
        <input 
        type="date" 
        placeholder="deadline.."
        required 
        className="form-control"
        onChange={e => setDeadline(e.target.value)}
        />
    </FormGroup>
    <Button 
    onClick={e => user.isAdmin && handleAddFixture(e)}
    color="primary"
    >Submit</Button>
    </Form>
    </ModalBody>
</Modal>
)}

export default AddFixtureModal