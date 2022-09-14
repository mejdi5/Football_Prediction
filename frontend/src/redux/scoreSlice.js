import { createSlice } from "@reduxjs/toolkit";


const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        scores: [],
        fixtureScores: [],
        userFixtureScores: [],
    },
    reducers: {

        getScores: (state, action) => {
            state.scores = action.payload
        },

        getFixtureScores: (state, action) => {
            state.fixtureScores = action.payload
        },

        getUserFixtureScores: (state, action) => {
            state.userFixtureScores = action.payload
        },

}
})

const { actions, reducer } = scoreSlice

export const { getScores, getFixtureScores, getUserFixtureScores } = actions;

export default reducer