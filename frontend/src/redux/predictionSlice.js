import { createSlice } from "@reduxjs/toolkit";


const predictionSlice = createSlice({
    name: 'prediction',
    initialState: {
        currentFixtureUserPredictions: [],
        fixtureUserPredictions: []
    },
    reducers: {

        getCurrentFixtureUserPredictions: (state, action) => {
            state.currentFixtureUserPredictions = action.payload
        },

        getFixtureUserPredictions: (state, action) => {
            state.fixtureUserPredictions = action.payload
        },
}
})

const { actions, reducer } = predictionSlice

export const { 
    getCurrentFixtureUserPredictions,
    getFixtureUserPredictions
} = actions;

export default reducer