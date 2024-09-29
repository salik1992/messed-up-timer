import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { toDuration } from '../../utils'
import { TIMERS } from '../../timers'
import { Button } from '../Button'
import { useFitSize } from './useFitSize'
import './Timer.scss'
import { useSounds } from './useSounds'

function getProgressBgStyle(progress: number) {
    return `radial-gradient(closest-side, #002d62 79%, transparent 80% 100%), conic-gradient(#7799ff ${
        progress * 100
    }%, #336699 0)`
}

export function Timer() {
    const { recentTimers } = useSelector((state: RootState) => state.timers)
    const settings = useSelector((state: RootState) => state.settings)
    const navigate = useNavigate()
    const timer = useRef(
        new TIMERS[settings.timerMode](recentTimers[0], settings[settings.timerMode]),
    )
    const rafRef = useRef<number>()
    const progress = useRef<HTMLDivElement>(null)
    const duration = useRef<HTMLDivElement>(null)
    const spinner = useRef<HTMLDivElement>(null)

    useFitSize(progress, duration, spinner)

    useSounds({ timer })

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
        if (spinner.current) {
            spinner.current.style.visibility = timer.current.buffering ? 'visible' : 'hidden'
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
        <div className="page timer">
            <div className="progress" ref={progress} />
            <div className="time" ref={duration}>
                {toDuration(recentTimers[0])}
            </div>
            <div className="lds-spinner" ref={spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Button onClick={stop} type="danger">
                STOP
            </Button>
        </div>
    )
}
