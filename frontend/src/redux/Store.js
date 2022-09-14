import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from './userSlice'
import fixtureSlice from './fixtureSlice'
import predictionSlice from './predictionSlice'
import scoreSlice from './scoreSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ 
    userSlice,
    fixtureSlice,
    predictionSlice,
    scoreSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export let persistor = persistStore(Store);