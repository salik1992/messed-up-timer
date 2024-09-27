import { configureStore } from '@reduxjs/toolkit'
import { timersReducer } from '../components/Main'

export const store = configureStore({
    reducer: {
        timers: timersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
