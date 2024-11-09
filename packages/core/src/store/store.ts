import { configureStore } from '@reduxjs/toolkit'
import { timersReducer } from '../reducers/main'
import { settingsReducer } from '../reducers/settings'

export const store = configureStore({
    reducer: {
        timers: timersReducer,
        settings: settingsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
