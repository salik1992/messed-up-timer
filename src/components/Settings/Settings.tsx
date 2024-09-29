import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { useNavigateBack } from '../../utils'
import { Button } from '../Button'
import { TimerTypePicker } from '../TimerTypePicker'
import { resetSettings } from './reducer'
import { EnableTickingSound } from './EnableTickingSound'
import { ShowTimerPicker } from './ShowTimerPicker'
import { ShowExpectedRuntime } from './ShowExpectedRuntime'
import { SettingsSlowingDown } from './SettingsSlowingDown'
import { SettingsSpeedingUp } from './SettingsSpeedingUp'
import { SettingsLagging } from './SettingsLagging'
import { SettingsNearlyThereAndBack } from './SettingsNearlyThereAndBack'
import './Settings.scss'

export function Settings() {
    const { timerMode } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()
    const back = useNavigateBack()

    const reset = useCallback(() => {
        if (window.confirm('Are you sure you want to reset all settings?')) {
            dispatch(resetSettings())
        }
    }, [dispatch])

    return (
        <div className="page settings">
            <header>
                <Link to="/about">About</Link>
                <Link to={'..'} onClick={back}>
                    Back
                </Link>
            </header>
            <main>
                <h4>See "About" for description of various timer types.</h4>
                <ShowTimerPicker />
                <ShowExpectedRuntime />
                <EnableTickingSound />
                <TimerTypePicker />
                {timerMode === 'slowingDown' && <SettingsSlowingDown />}
                {timerMode === 'speedingUp' && <SettingsSpeedingUp />}
                {timerMode === 'lagging' && <SettingsLagging />}
                {timerMode === 'nearlyThereAndBack' && <SettingsNearlyThereAndBack />}
                <div className="center">
                    <Button type="danger" onClick={reset}>
                        Reset All Settings
                    </Button>
                </div>
            </main>
        </div>
    )
}
