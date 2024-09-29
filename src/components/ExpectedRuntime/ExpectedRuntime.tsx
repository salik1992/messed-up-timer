import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { TIMERS } from '../../timers'

type Props = {
    time: number
}

export function ExpectedRuntime({ time }: Props) {
    const settings = useSelector((state: RootState) => state.settings)
    const timer = useMemo(
        () => new TIMERS[settings.timerMode](time, settings[settings.timerMode]),
        [settings, time],
    )
    const expected = useMemo(() => timer.estimate, [timer])

    return <div className="expected-runtime">Expected Runtime: {expected}</div>
}
