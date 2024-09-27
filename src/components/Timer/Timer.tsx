import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { toDuration } from '../../utils'
import {
    type Timer as ITimer,
    type TimerTypes,
    RegularTimer,
    SlowingDownTimer,
    SpeedingUpTimer,
    LaggingTimer,
    NearlyThereAndBackAgainTimer,
} from '../../timers'
import { Button } from '../Button'
import { useFitSize } from './useFitSize'
import './Timer.scss'

const TIMERS = {
    lagging: LaggingTimer,
    nearlyThereAndBack: NearlyThereAndBackAgainTimer,
    regular: RegularTimer,
    slowingDown: SlowingDownTimer,
    speedingUp: SpeedingUpTimer,
} as Readonly<Record<TimerTypes, new (time: number) => ITimer>>

function getProgressBgStyle(progress: number) {
    return `radial-gradient(closest-side, #002d62 79%, transparent 80% 100%), conic-gradient(#7799ff ${
        progress * 100
    }%, #336699 0)`
}

export function Timer() {
    const { recentTimers } = useSelector((state: RootState) => state.timers)
    const navigate = useNavigate()
    const timer = useRef(new TIMERS['nearlyThereAndBack'](recentTimers[0]))
    const rafRef = useRef<number>()
    const progress = useRef<HTMLDivElement>(null)
    const duration = useRef<HTMLDivElement>(null)

    useFitSize(progress, duration)

    const tick = useCallback(() => {
        timer.current.tick()
        if (duration.current) {
            duration.current.innerHTML = toDuration(timer.current.remaining)
        }
        if (progress.current) {
            progress.current.style.background = getProgressBgStyle(
                timer.current.remaining / timer.current.time,
            )
        }
        if (timer.current.remaining > 0) {
            rafRef.current = window.requestAnimationFrame(tick)
        }
    }, [timer])

    useEffect(() => {
        tick()
        console.log(timer.current.estimate)
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    const stop = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <div className="timer">
            <div className="progress" ref={progress} />
            <div className="time" ref={duration}>
                {toDuration(recentTimers[0])}
            </div>
            <Button onClick={stop} type="danger">
                STOP
            </Button>
        </div>
    )
}
