import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styles from './PointsModal.module.css'


const PointsModal = ({pointsDetails, setPointsDetails, currentMatch, currentMatchPrediction}) => {
    console.log(currentMatch, currentMatchPrediction)
    const resultPoints = currentMatch.result === currentMatchPrediction.resultPrediction ? 3 : 0
    const homeTeamScorePoints = currentMatch.homeTeamScore === currentMatchPrediction.homeTeamScorePrediction ? 1 : 0
    const awayTeamScorePoints = currentMatch.awayTeamScore === currentMatchPrediction.awayTeamScorePrediction ? 1 : 0
    const goalDifferencePoints = (currentMatch.homeTeamScore - currentMatch.awayTeamScore) === (currentMatchPrediction.homeTeamScorePrediction - currentMatchPrediction.awayTeamScorePrediction) ? 1 : 0
return (
    <Modal isOpen={pointsDetails} toggle={() => setPointsDetails(!pointsDetails)}>
        <ModalHeader toggle={() => setPointsDetails(!pointsDetails)} >
            <strong className={styles.header}>
                {currentMatch.homeTeam.toUpperCase()} VS {currentMatch.awayTeam.toUpperCase()} 
            </strong>
        </ModalHeader>
        <ModalBody>
        <table  className={styles.table}>
        <tbody>
            <tr>
                <th className={styles.th}>RESULT</th>
                <th className={styles.th}>PREDICTION</th>
                <th className={styles.th}>POINTS</th>
            </tr>
            <tr>
                <td className={styles.td}>
                    {currentMatch.result === "home team win"
                    ? `${currentMatch.homeTeam} wins`
                    : currentMatch.result === "away team win"
                    ? `${currentMatch.awayTeam} wins`
                    : "draw"
                    }
                </td>
                <td className={styles.td}>
                    {currentMatchPrediction.resultPrediction === "home team win"
                    ? `${currentMatch.homeTeam} wins`
                    : currentMatchPrediction.resultPrediction === "away team win"
                    ? `${currentMatch.awayTeam} wins`
                    : "draw"
                    }
                </td>
                <td className={styles.td}>{resultPoints}</td>
            </tr>
        </tbody>
        </table>
        <hr/>
        <table className={styles.table}>
        <tbody>
            <tr>
                <th className={styles.th}>{currentMatch.homeTeam.toUpperCase()} GOALS</th>
                <th className={styles.th}>PREDICTION</th>
                <th className={styles.th}>POINTS</th>
            </tr>
            <tr>
                <td className={styles.td}>{currentMatch.homeTeamScore}</td>
                <td className={styles.td}>{currentMatchPrediction.homeTeamScorePrediction}</td>
                <td className={styles.td}>{homeTeamScorePoints}</td>
            </tr>
        </tbody>
        </table>
        <hr/>
        <table className={styles.table}>
        <tbody>
            <tr>
                <th className={styles.th}>{currentMatch.awayTeam.toUpperCase()} GOALS</th>
                <th className={styles.th}>PREDICTION</th>
                <th className={styles.th}>POINTS</th>
            </tr>
            <tr>
                <td className={styles.td}>{currentMatch.awayTeamScore}</td>
                <td className={styles.td}>{currentMatchPrediction.awayTeamScorePrediction}</td>
                <td className={styles.td}>{awayTeamScorePoints}</td>
            </tr>
        </tbody>
        </table>
        <hr/>
        <table className={styles.table}>
        <tbody>
            <tr>
                <th className={styles.th}>GOAL DIFFERENCE</th>
                <th className={styles.th}>PREDICTION</th>
                <th className={styles.th}>POINTS</th>
            </tr>
            <tr>
                <td className={styles.td}>{currentMatch.homeTeamScore - currentMatch.awayTeamScore}</td>
                <td className={styles.td}>{currentMatchPrediction.homeTeamScorePrediction - currentMatchPrediction.awayTeamScorePrediction}</td>
                <td className={styles.td}>{goalDifferencePoints}</td>
            </tr>
        </tbody>
        </table>
        <hr/>
        <strong  className={styles.total}>Total: {resultPoints + homeTeamScorePoints + awayTeamScorePoints + goalDifferencePoints}</strong>
        </ModalBody>
    </Modal>
)}

export default PointsModal