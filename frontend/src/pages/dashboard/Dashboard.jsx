import React, {useEffect, useState} from 'react'
import styles from "./Dashboard.module.css"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "../../components/sidebar/Sidebar"
import { Button } from 'reactstrap';
import AddMatchModal from '../../components/AddMatchModal'
import PredictionModal from '../../components/prediction/AddPredictionModal'
import AddFixtureModal from '../../components/AddFixtureModal';
import { Axios } from '../../Axios';
import {IoMdAdd} from 'react-icons/io'
import EditPredictionModal from '../../components/prediction/EditPredictionModal';
import { getFixtureUserPredictions } from '../../redux/predictionSlice';
import EditFixtureModal from '../../components/EditFixtureModal';


const Dashboard = () => {

    const user = useSelector(state => state.userSlice.user)
    const fixtures = useSelector(state => state.fixtureSlice.fixtures)
    const fixtureUserPredictions = useSelector(state => state.predictionSlice.fixtureUserPredictions)
    const [showAddMatchModal, setShowAddMatchModal] = useState(false);
    const [showAddFixtureModal, setShowAddFixtureModal] = useState(false);
    const [showEditFixtureModal, setShowEditFixtureModal] = useState(false);
    const [openAddPredictionModal, setOpenAddPredictionModal] = useState(false);
    const [openEditPredictionModal, setOpenEditPredictionModal] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(null)
    const daysArray = ["Sunday", "Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]
    const currentFixture = fixtures.find(fixture => new Date(fixture?.deadline) > new Date(Date.now()))
    const [currentPrediction, setCurrentPrediction] = useState(null)
    const [fixture, setFixture] = useState(fixtures[fixtures.length - 1])
    const dispatch = useDispatch()

    useEffect(() => {
        const getAllFixtureUserPredictions = async () => {
            try {
                const res = await Axios.get(`/predictions/${user?._id}/${currentFixture?._id}`)
                dispatch(getFixtureUserPredictions(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        !user.isAdmin && getAllFixtureUserPredictions()
    }, [fixtureUserPredictions])
    
    
return (
<div className={styles.container}>
    <Sidebar/>
    <div className={styles.wrapper}>
        <div className={styles.top}>
            {user.isAdmin &&
            <Button
            color="primary"
            onClick={() => setShowAddFixtureModal(true)}
            >
            New
            </Button>}
            {user.isAdmin && showAddFixtureModal && 
            <AddFixtureModal
            showAddFixtureModal={showAddFixtureModal}
            setShowAddFixtureModal={setShowAddFixtureModal}
            />}
            {currentFixture &&
            <div className={styles.fixture}>
                <span className={styles.fixtureNumber}>
                    Fixture {currentFixture?.fixtureNumber}
                </span>
                <span className={styles.deadline}>
                    Deadline: {daysArray[new Date(currentFixture?.deadline).getDay()]} {new Date(currentFixture?.deadline).getDate()} - {new Date(currentFixture?.deadline).getMonth() + 1} - {new Date(currentFixture?.deadline).getFullYear()} | 00:00
                </span>
                
                <div className={styles.editFixture}>
                {user.isAdmin &&
                <Button
                color="success"
                onClick={() => setShowEditFixtureModal(true)}
                >
                    Edit Deadline
                </Button>}
                {showEditFixtureModal && 
                <EditFixtureModal
                showEditFixtureModal={showEditFixtureModal}
                setShowEditFixtureModal={setShowEditFixtureModal}
                currentFixture={currentFixture}
                />}
                </div>
                {user.isAdmin &&
                <div className={styles.selectFixture}>
                    <label className={styles.label}>Fixture</label>
                    <div className={styles.form}>
                    <input
                    type="number"
                    className={styles.input}
                    value={fixture?.fixtureNumber}
                    onChange={e => setFixture(fixtures?.find(f => f.fixtureNumber === Number(e.target.value)))}
                    min="1"
                    max={fixtures.length}
                    />
                    </div>
                </div>
                }
                {user.isAdmin &&
                <span 
                className={styles.addIcon}
                onClick={() => setShowAddMatchModal(true)}>
                    <IoMdAdd/>
                </span>
                }
                {user.isAdmin && showAddMatchModal && 
                <AddMatchModal
                showAddMatchModal={showAddMatchModal}
                setShowAddMatchModal={setShowAddMatchModal}
                fixture={fixture}
                />}
            </div>
            }
        </div>
        {!user.isAdmin ?
        <div className={styles.bottom}>
            {currentFixture?.matches.length > 0 && 
            <ul className={styles.matchList}>
            {currentFixture?.matches?.map(match => { 
                return (
                <li key={match._id} className={styles.matchItem}>
                    <div className={styles.match}>
                        <span className={styles.matchTeam}>{match.homeTeam}</span>
                        <span>VS</span>
                        <span className={styles.matchTeam}>{match.awayTeam}</span>
                    </div>
                    {!user.isAdmin &&
                    <button
                    className={fixtureUserPredictions?.some(prediction => prediction.matchId === match?._id) ? styles.changePredictionButton : styles.predictionButton}
                    onClick={() => {
                        if(!fixtureUserPredictions?.some(prediction => prediction.matchId === match?._id)) {
                            setCurrentMatch(match)
                            setOpenAddPredictionModal(true)
                        } else {
                            setCurrentMatch(match)
                            setCurrentPrediction(fixtureUserPredictions?.find(prediction => prediction.matchId === match?._id))
                            setOpenEditPredictionModal(true)
                        }
                    }}
                >{fixtureUserPredictions?.some(prediction => prediction.matchId === match?._id) ? "Change" : "Predict"}</button>}
                </li>
            )}
            )}
                {!user.isAdmin && openAddPredictionModal && 
                    <PredictionModal
                    openAddPredictionModal={openAddPredictionModal}
                    setOpenAddPredictionModal={setOpenAddPredictionModal}
                    currentMatch={currentMatch}
                    currentFixture={currentFixture}
                    />
                }
                {!user.isAdmin && openEditPredictionModal && 
                    <EditPredictionModal
                    openEditPredictionModal={openEditPredictionModal}
                    setOpenEditPredictionModal={setOpenEditPredictionModal}
                    currentMatch={currentMatch}
                    currentFixture={currentFixture}
                    currentPrediction={currentPrediction}
                    />
                }
            </ul>
            }
            <div className={styles.rulesWrapper}>
            <ul className={styles.rules}>
                <li className={styles.rulesItem}>
                    <strong>Correct result</strong> 
                    <span>3 points</span>
                </li>
                <li className={styles.rulesItem}>
                    <strong>Home goals</strong> 
                    <span>1 point</span>
                </li>
                <li className={styles.rulesItem}>
                    <strong>Away goals</strong> 
                    <span>1 point</span>
                </li>
                <li className={styles.rulesItem}>
                    <strong>Goal difference</strong> 
                    <span>1 point</span>
                </li>
            </ul>
            </div>
        </div>
        : 
        <div className={styles.bottom}>
            {fixture?.matches?.length > 0 && 
            <ul className={styles.matchList}>
                    {fixture?.matches?.map(match => { 
                        return (
                        <li key={match?._id} className={styles.matchItem}>
                            <div className={styles.match}>
                                <span className={styles.matchTeam}>{match?.homeTeam}</span>
                                <span>VS</span>
                                <span className={styles.matchTeam}>{match?.awayTeam}</span>
                            </div>
                        </li>
                    )}
                    )}
            </ul>
            }
        </div>
        }
    </div>
</div>
)}

export default Dashboard