import { createSlice } from "@reduxjs/toolkit";


const fixtureSlice = createSlice({
    name: 'fixture',
    initialState: {
        fixtures: [],
    },
    reducers: {

        getAllFixtures: (state, action) => {
            state.fixtures = action.payload
        }

}
})

const { actions, reducer } = fixtureSlice

export const { 
    getAllFixtures,
} = actions;

export default reducer