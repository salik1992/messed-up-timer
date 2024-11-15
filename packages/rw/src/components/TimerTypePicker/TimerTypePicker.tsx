import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { settings, type RootState, type TimerTypes } from '@messed-up-timer/core'
import './TimerTypePicker.scss'

export function TimerTypePicker() {
    const { timerMode } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = event.target
            dispatch(settings.setTimerMode(value as TimerTypes))
        },
        [dispatch],
    )

    return (
        <div className="timer-type">
            <label htmlFor="timerMode">Timer Type:</label>
            <select id="timerMode" onChange={onChange} value={timerMode}>
                <option value="regular">Regular</option>
                <option value="slowingDown">Slowing Down</option>
                <option value="speedingUp">Speeding Up</option>
                <option value="lagging">Lagging</option>
                <option value="nearlyThereAndBack">Nearly There And Back Again</option>
            </select>
        </div>
    )
}
