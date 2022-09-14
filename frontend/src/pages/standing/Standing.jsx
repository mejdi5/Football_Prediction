import React, {useEffect, useState} from 'react'
import styles from './Standing.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {Axios} from '../../Axios'
import Sidebar from '../../components/sidebar/Sidebar';
import { getFixtureScores } from '../../redux/scoreSlice';


const Standing = () => {

    const user = useSelector(state => state.userSlice.user)
    const users = useSelector(state => state.userSlice.users)
    const scores = useSelector(state => state.scoreSlice.scores)
    const fixtures = useSelector(state => state.fixtureSlice.fixtures)
    const fixtureScores = useSelector(state => state.scoreSlice.fixtureScores)
    const [fixture, setFixture] = useState("total")
    const currentFixture = fixtures.find(f => f.fixtureNumber === fixture)
    const dispatch = useDispatch()


    useEffect(() => {
    const getAllFixtureScores = async () => {
        try {
            const res = await Axios.get(`/scores/${currentFixture?._id}`)
            dispatch(getFixtureScores(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    getAllFixtureScores();
    }, [fixture])
    

    const usersScores = users.filter(u => !u.isAdmin).map(user => {
        const userScores = !currentFixture 
        ? scores.filter(score => score.userId === user?._id).map(score => score.points)
        : scores.filter(score => score.userId === user?._id && score.fixtureId === currentFixture?._id).map(score => score.points)
        const totalUserScore = userScores.length > 0 ? userScores.reduce((a,b) => a + b) : 0
        return {
            user,
            score: totalUserScore
        }
    })

    const currentUserScores = scores.filter(score => score.userId === user?._id).map(score => score.points)
    const totalCurrentUserPoints = currentUserScores.length > 0 ? currentUserScores.reduce((a,b) => a + b) : 0

return (
<div className={styles.container}>
    <Sidebar/>
    <div className={styles.wrapper}>
        {!user.isAdmin &&
            <h2 className={styles.totalScore}>
                Total Score: {totalCurrentUserPoints} 
            </h2>
        }
        <div className={styles.top}>
            <span className={styles.label}>Fixture</span>
            <div className={styles.form}>
                <input
                type="number"
                className={styles.input}
                value={fixture !== "total" ? fixture : ''}
                onChange={e => setFixture(Number(e.target.value))}
                min="1"
                max={fixtures.length}
                />
                <button 
                style={!currentFixture ? {backgroundColor: 'black', color: 'white'} : null}
                className={styles.total}
                onClick={() => setFixture("total")}
                >Overall</button>
            </div>
        </div>
        <div className={styles.standing}>
            {usersScores.sort((a,b) => b.score - a.score).map((item, index) => 
                <div key={index} className={ item.user._id !== user?._id ? styles.standingItem : styles.standingItemUser}>
                    <span className={styles.index}>{index + 1}-</span>
                    <span className={styles.user}>{item.user.name}</span>
                    <span className={styles.score}>{item.score}</span>
                </div>
            )}
        </div>
    </div>
</div>
)}

export default Standing