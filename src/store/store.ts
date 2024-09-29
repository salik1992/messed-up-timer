import { configureStore } from '@reduxjs/toolkit'
import { timersReducer } from '../components/Main'
import { settingsReducer } from '../components/Settings'

export const store = configureStore({
    reducer: {
        timers: timersReducer,
        settings: settingsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
