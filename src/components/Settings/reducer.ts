import { createAction, createReducer } from '@reduxjs/toolkit'
import type { TimerTypes } from '../../timers'
import { seconds, storePreferences } from '../../utils'

const { load, save } = storePreferences('settings')

const DEFAULTS = {
    timerMode: 'regular',
    slowingDown: {
        coef: 3 as number,
        startAt: 0.5 as number,
    },
    speedingUp: {
        coef: 3 as number,
        startAt: 0.5 as number,
    },
    lagging: {
        frequency: 5 as number,
        min: seconds(1),
        max: seconds(5),
    },
    nearlyThereAndBack: {
        stopAt: seconds(3),
        stopFor: seconds(2),
    },
    enableTicking: false as boolean,
    showTimerPicker: true as boolean,
    showExpectedRuntime: true as boolean,
} as const

const INITIAL_STATE = {
    timerMode: load<TimerTypes>('timerMode', DEFAULTS.timerMode),
    slowingDown: load('slowingDown', DEFAULTS.slowingDown),
    speedingUp: load('speedingUp', DEFAULTS.speedingUp),
    lagging: load('lagging', DEFAULTS.lagging),
    nearlyThereAndBack: load('nearlyThereAndBack', DEFAULTS.nearlyThereAndBack),
    enableTicking: load('enableTicking', DEFAULTS.enableTicking),
    showTimerPicker: load('showTimerPicker', DEFAULTS.showTimerPicker),
    showExpectedRuntime: load('showExpectedRuntime', DEFAULTS.showExpectedRuntime),
}

export const setTimerMode = createAction<TimerTypes>('settings/setTimerMode')
export const setSlowingDown =
    createAction<(typeof INITIAL_STATE)['slowingDown']>('settings/slowingDown')
export const setSpeedingUp =
    createAction<(typeof INITIAL_STATE)['speedingUp']>('settings/speedingUp')
export const setLagging = createAction<(typeof INITIAL_STATE)['lagging']>('settings/lagging')
export const setNearlyThereAndBack = createAction<(typeof INITIAL_STATE)['nearlyThereAndBack']>(
    'settings/nearlyThereAndBack',
)
export const setEnableTicking = createAction<boolean>('settings/enableTicking')
export const setShowTimerPicker = createAction<boolean>('settings/showTimerPicker')
export const setShowExpectedRuntime = createAction<boolean>('settings/showExpectedRuntime')
export const resetSettings = createAction<void>('settings/reset')

function resetAndSave<T extends keyof typeof INITIAL_STATE>(state: typeof INITIAL_STATE, key: T) {
    state[key] = DEFAULTS[key]
    save(key, DEFAULTS[key])
}

export const settingsReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(setTimerMode, (state, { payload }) => {
            state.timerMode = payload
            save('timerMode', payload)
        })
        .addCase(setSlowingDown, (state, { payload }) => {
            state.slowingDown = payload
            save('slowingDown', payload)
        })
        .addCase(setSpeedingUp, (state, { payload }) => {
            state.speedingUp = payload
            save('speedingUp', payload)
        })
        .addCase(setLagging, (state, { payload }) => {
            state.lagging = payload
            save('lagging', payload)
        })
        .addCase(setNearlyThereAndBack, (state, { payload }) => {
            state.nearlyThereAndBack = payload
            save('nearlyThereAndBack', payload)
        })
        .addCase(setEnableTicking, (state, { payload }) => {
            state.enableTicking = payload
            save('enableTicking', payload)
        })
        .addCase(setShowTimerPicker, (state, { payload }) => {
            state.showTimerPicker = payload
            save('showTimerPicker', payload)
        })
        .addCase(setShowExpectedRuntime, (state, { payload }) => {
            state.showExpectedRuntime = payload
            save('showExpectedRuntime', payload)
        })
        .addCase(resetSettings, (state) => {
            resetAndSave(state, 'timerMode')
            resetAndSave(state, 'slowingDown')
            resetAndSave(state, 'speedingUp')
            resetAndSave(state, 'lagging')
            resetAndSave(state, 'nearlyThereAndBack')
            resetAndSave(state, 'enableTicking')
            resetAndSave(state, 'showTimerPicker')
            resetAndSave(state, 'showExpectedRuntime')
        })
})
