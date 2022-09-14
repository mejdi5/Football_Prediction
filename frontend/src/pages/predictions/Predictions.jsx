import React, {useState, useEffect} from 'react'
import styles from "./Predictions.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from '../../Axios';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getFixtureUserPredictions } from '../../redux/predictionSlice';
import { getUserFixtureScores } from '../../redux/scoreSlice'
import PointsModal from '../../components/pointDetails/PointsModal';


const Predictions = () => {

    const users = useSelector(state => state.userSlice.users)
    const user = useSelector(state => state.userSlice.user)
    const dispatch = useDispatch()
    const userId = useParams().userId
    const predictor = users.find(u => u?._id === userId)
    const fixtures = useSelector(state => state.fixtureSlice.fixtures)
    const [fixture, setFixture] = useState(fixtures[fixtures.length - 1].fixtureNumber)
    const fixtureUserPredictions = useSelector(state => state.predictionSlice.fixtureUserPredictions)
    const currentFixture = fixtures.find(f => f.fixtureNumber === fixture) 
    const scores = useSelector(state => state.scoreSlice.scores)
    const userFixtureScores = useSelector(state => state.scoreSlice.userFixtureScores)
    const fixtureUserScores = scores.filter(score => score.fixtureId === currentFixture?._id && score.userId === user?._id)
    const fixtureUserPoints = fixtureUserScores.length > 0 
    ? fixtureUserScores.map(score => score.points).reduce((a,b) => a + b) 
    : 0
    const [pointsDetails, setPointsDetails] = useState(false)
    const [currentMatch, setCurrentMatch] = useState(null)
    const [currentMatchPrediction, setCurrentMatchPrediction] = useState(null)

    useEffect(() => {
    const getAllUserFixtureScores = async () => {
        try {
            const res = await Axios.get(`scores/${user?._id}/${currentFixture?._id}`)
            dispatch(getUserFixtureScores(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    !user.isAdmin &&  getAllUserFixtureScores()
    }, [userFixtureScores])


    useEffect(() => {
        const getAllFixtureUserPredictions = async () => {
            try {
                const res = await Axios.get(`/predictions/${userId}/${currentFixture?._id}`)
                dispatch(getFixtureUserPredictions(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        getAllFixtureUserPredictions()
    }, [fixture])
    

return (
<div className={styles.container}>
    <Sidebar/>
    <div className={styles.wrapper}>
        <div className={styles.title}>
            {predictor?._id === user?._id 
            ? <h3 className={styles.header}>YOUR PREDICTIONS</h3>
            : <h3 className={styles.header}>{predictor?.name?.toUpperCase()} PREDICTIONS</h3>
            }
        </div>
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
            {!user.isAdmin && <h4 className={styles.score}>Score: {fixtureUserPoints}</h4 >}
        </div>
        <div className={styles.bottom}>
            {fixtureUserPredictions.filter(prediction => prediction.userId === userId).length > 0
            ?
            <ul className={styles.matchList}>
            {fixtureUserPredictions.filter(prediction => prediction.userId === userId).map(prediction => {
                const match = currentFixture?.matches?.find(m => m?._id === prediction?.matchId)
                const matchUserScore = userFixtureScores && userFixtureScores?.find(score => score.matchId === match?._id) 
                return (
                <li key={prediction._id} className={styles.matchItem}>
                    <div className={styles.matchItemPrediction}>
                        <span className={styles.matchTeam}>{match?.homeTeam}</span>
                        <span>
                        {prediction.fixtureId === currentFixture?._id && prediction.homeTeamScorePrediction}
                        </span>
                        <span>{prediction.fixtureId === currentFixture?._id && '-'}</span>
                        <span>
                        {prediction.fixtureId === currentFixture?._id && prediction.awayTeamScorePrediction}
                        </span>
                        <span className={styles.matchTeam}>{match?.awayTeam}</span>
                    </div>
                    <span className={styles.matchResult}>
                        {match?.homeTeamScore !== null && match?.awayTeamScore !== null &&
                        `${match?.homeTeamScore} - ${match?.awayTeamScore}`
                        }
                    </span>
                    <strong 
                    onClick={() => {
                        setCurrentMatch(match)
                        setCurrentMatchPrediction(prediction)
                        setPointsDetails(true)
                    }}
                    style={matchUserScore?.points === 0 
                    ? {color: 'crimson', cursor:'pointer'}
                    : matchUserScore?.points === 1
                    ? {color: "rgb(200, 124, 57)", cursor:'pointer'}
                    : matchUserScore?.points === 3
                    ? {color: "rgb(112, 162, 112)", cursor:'pointer'}
                    : matchUserScore?.points === 4
                    ? {color: "rgb(149, 215, 69)", cursor:'pointer'}
                    : matchUserScore?.points === 6
                    ? {color: "cyan", cursor:'pointer'}
                    : null
                    }>
                        {(match?.homeTeamScore !== null && match?.awayTeamScore !== null && matchUserScore) && `+${matchUserScore?.points}`}
                    </strong> 
                    {pointsDetails &&
                    <PointsModal
                    pointsDetails={pointsDetails}
                    setPointsDetails={setPointsDetails}
                    currentMatch={currentMatch}
                    currentMatchPrediction={currentMatchPrediction}
                    />
                    }
                </li>
            )}
            )}
            </ul>
            :
            <div className={styles.noPredictions}>No Preditions</div>
            }
        </div>
    </div>
</div>
)}
export default Predictions