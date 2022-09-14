import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null, 
        users: [],
    },
    reducers: {

        getUser: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token
            state.user = action.payload
        },

        logoutUser: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null
        },

        getAllUsers: (state, action) => {
            state.users = action.payload
        },

        getCurrentUser: (state, action) => {
            state.user = action.payload
        },
}
})

const { actions, reducer } = userSlice

export const { 
    getUser,
    logoutUser,
    getAllUsers,
    getCurrentUser
} = actions;

export default reducer