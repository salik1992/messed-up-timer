import { createAction, createReducer } from '@reduxjs/toolkit'
import { storePreferences } from '../utils'

const { load, save } = storePreferences('timers')

export const setTimer = createAction<number>('timers/set')

const INITIAL_STATE = {
    recentTimers: load('recentTimers', [] as number[]),
}

export const timersReducer = createReducer(INITIAL_STATE, function (builder) {
    builder.addCase(setTimer, function (state, { payload }) {
        if (state.recentTimers.indexOf(payload) === -1) {
            state.recentTimers = [payload, ...state.recentTimers.slice(0, 4)]
        } else {
            state.recentTimers = [payload, ...state.recentTimers.filter((t) => t !== payload)]
        }
        save('recentTimers', state.recentTimers)
    })
})
