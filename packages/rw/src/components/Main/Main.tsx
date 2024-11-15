import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { type RootState, hours, minutes, seconds, toDuration, main } from '@messed-up-timer/core'
import { Button } from '../Button'
import { ExpectedRuntime } from '../ExpectedRuntime'
import { TimerTypePicker } from '../TimerTypePicker'
import { useSoundsEnabler } from './useSoundEnabler'
import './Main.scss'

const DEFAULT_TIMER = minutes(1)

export function Main() {
    const { recentTimers } = useSelector((state: RootState) => state.timers)
    const { showTimerPicker, showExpectedRuntime } = useSelector(
        (state: RootState) => state.settings,
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [timer, setTimer] = useState(recentTimers[0] ?? DEFAULT_TIMER)
    const enableAudio = useSoundsEnabler()

    const adjustTimer = useCallback(
        (diff: number) => {
            setTimer((currentTimer) => {
                const newTimer = currentTimer + diff
                return newTimer > 0 ? newTimer : currentTimer
            })
        },
        [setTimer],
    )

    const addHour = useCallback(() => adjustTimer(hours(1)), [adjustTimer])
    const removeHour = useCallback(() => adjustTimer(hours(-1)), [adjustTimer])
    const addMinute = useCallback(() => adjustTimer(minutes(1)), [adjustTimer])
    const removeMinute = useCallback(() => adjustTimer(minutes(-1)), [adjustTimer])
    const addSecond = useCallback(() => adjustTimer(seconds(1)), [adjustTimer])
    const removeSecond = useCallback(() => adjustTimer(seconds(-1)), [adjustTimer])

    const start = useCallback(async () => {
        await enableAudio()
        dispatch(main.setTimer(timer))
        navigate('/timer')
    }, [timer, dispatch, navigate, enableAudio])

    const [s, m = '0', h = '0'] = toDuration(timer).split(':').reverse()

    return (
        <div className="page main">
            <header>
                <Link to="/settings">Settings</Link>
            </header>
            <main>
                <table>
                    <tbody>
                        <tr>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                        </tr>
                        <tr>
                            <td>
                                <span onClick={addHour}>▲</span>
                            </td>
                            <td>
                                <span onClick={addMinute}>▲</span>
                            </td>
                            <td>
                                <span onClick={addSecond}>▲</span>
                            </td>
                        </tr>
                        <tr>
                            <td>{h}</td>
                            <td>{m}</td>
                            <td>{s}</td>
                        </tr>
                        <tr>
                            <td>
                                <span onClick={removeHour}>▼</span>
                            </td>
                            <td>
                                <span onClick={removeMinute}>▼</span>
                            </td>
                            <td>
                                <span onClick={removeSecond}>▼</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={start} type="success">
                    Start
                </Button>
                {showTimerPicker && <TimerTypePicker />}
                {showExpectedRuntime && <ExpectedRuntime time={timer} />}
            </main>
        </div>
    )
}
