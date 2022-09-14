import React, {useEffect, useState} from 'react'
import styles from "./Results.module.css"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "../../components/sidebar/Sidebar"
import ScoreModal from '../../components/score/ScoreModal'
import { Button } from 'reactstrap'
import { Axios } from '../../Axios'


const Results = () => {

    const user = useSelector(state => state.userSlice.user)
    const scores = useSelector(state => state.scoreSlice.scores)
    const fixtures = useSelector(state => state.fixtureSlice.fixtures)
    const [openScoreModal, setOpenScoreModal] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(null)
    const [fixture, setFixture] = useState(fixtures[fixtures.length - 1].fixtureNumber)
    const currentFixture = fixtures.find(f => f.fixtureNumber === fixture)
    const dispatch = useDispatch()
    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null) 


    const handleCalculateUsersScores = async (e) => {
        try {
            scores.filter(score => score.fixtureId === currentFixture?._id).map(async score => {
                try {
                    await Axios.put(`/scores/${score.userId}/${score.fixtureId}/${score.matchId}`)
                } catch (err) {
                    setError(err.message)
                }
            })
            await Axios.put(`/fixtures/calculate/${currentFixture?._id}`)
            setMsg("Scores calculated")
        } catch (error) {
            console.log(error)
        }
    }


return (
<div className={styles.container}>
    <Sidebar/>
    <div className={styles.wrapper}>
        {msg && <span className={styles.msg}>{msg}</span>}
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.top}>
            <label className={styles.label}>Fixture</label>
            <div className={styles.form}>
                <input
                type="number"
                className={styles.input}
                value={fixture}
                onChange={e => setFixture(Number(e.target.value))}
                min="1"
                max={fixtures.length}
                />
            </div>
        </div>
        <div className={styles.bottom}>
            <ul className={styles.matchList}>
            {currentFixture && currentFixture?.matches.map(match => { 
                return (
                <li key={match._id} className={styles.matchItem}>
                    <span className={styles.matchTeam}>{match.homeTeam}</span>
                    <div style={{display: 'flex'}}>
                        <span className={styles.matchTeam}>{match.homeTeamScore}</span>
                        <span className={styles.dash}>-</span>
                        <span className={styles.matchTeam}>{match.awayTeamScore}</span>
                    </div>
                    <span className={styles.matchTeam}>{match.awayTeam}</span>
                    {user.isAdmin &&
                    <button
                    className={styles.scoreButton}
                    onClick={() => {
                        setCurrentMatch(match)
                        setOpenScoreModal(true)
                    }}
                    >Result</button>
                    }
                </li>
            )}
                )}
            {user.isAdmin && openScoreModal && 
                <ScoreModal
                openScoreModal={openScoreModal}
                setOpenScoreModal={setOpenScoreModal}
                currentMatch={currentMatch}
                currentFixture={currentFixture}
                />
            }
            </ul>
        </div>
        {user.isAdmin && !currentFixture.isCalculated &&
        <div className={styles.calculate}>
            <Button
            color="success"
            disabled={
                !currentFixture.matches.every(match => match.homeTeamScore !== null && match.awayTeamScore !== null) 
                ? true 
                : false 
            }
            onClick={e => handleCalculateUsersScores(e)}
            >Calculate</Button>
        </div>
        }
    </div>
</div>
)}

export default Results