import React,{useEffect, useState} from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import {Axios} from './Axios'
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard'
import Predictions from './pages/predictions/Predictions'
import Results from './pages/results/Results';
import Standing from './pages/standing/Standing';
import {getAllUsers} from './redux/userSlice'
import { getAllFixtures } from './redux/fixtureSlice';
import { getCurrentFixtureUserPredictions } from './redux/predictionSlice';
import {getScores} from './redux/scoreSlice'


function App() {

  const user = useSelector(state => state.userSlice.user)
  const users = useSelector(state => state.userSlice.users)
  const fixtures = useSelector(state => state.fixtureSlice.fixtures)
  const currentFixtureUserPredictions = useSelector(state => state.predictionSlice.currentFixtureUserPredictions)
  const scores = useSelector(state => state.scoreSlice.scores)
  const currentFixture = fixtures.find(fixture => new Date(fixture?.deadline) > new Date(Date.now()))
  const dispatch = useDispatch()


    useEffect(() => {
      const getUsers = async () => {
            try {
                const res = await Axios.get(`/users`)
                dispatch(getAllUsers(res.data))
            } catch (error) {
                console.log(error)
            }
      }
      user && getUsers();
    }, [users])

    useEffect(() => {
      const getFixtures = async () => { 
          try {
              const res = await Axios.get(`/fixtures`)
              dispatch(getAllFixtures(res.data))
          } catch (error) {
              console.log(error)
          }
      }
      getFixtures()
      }, [fixtures])
  
      useEffect(() => {
          const getPredictions = async () => {
              try {
                  const res = await Axios.get(`/predictions/${user?._id}/${currentFixture?._id}`)
                  dispatch(getCurrentFixtureUserPredictions(res.data))
              } catch (error) {
                  console.log(error)
              }
          }
          user && !user.isAdmin && getPredictions()
      }, [currentFixtureUserPredictions])
  
      useEffect(() => {
      const getAllScores = async () => {
          try {
              const res = await Axios.get(`/scores`)
              dispatch(getScores(res.data))
          } catch (error) {
              console.log(error)
          }
      }
      getAllScores()
      }, [scores])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
        user 
        ? 
        <Dashboard/>
        : 
        <Home/>
        }/>

        <Route path="/predictions/:userId" element={ 
        user 
        ? 
        <Predictions/>
        : 
        <Navigate to="/"/>
        }/>

        <Route path="/results" element={ 
        user 
        ? 
        <Results/>
        : 
        <Navigate to="/"/>
        }/>

        <Route path="/standing" element={ 
        user 
        ? 
        <Standing/>
        : 
        <Navigate to="/"/>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
