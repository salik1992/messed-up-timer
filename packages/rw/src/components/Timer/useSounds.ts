import { useCallback, useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { type RootState, Timer } from '@messed-up-timer/core'
import { AudioElementContext } from '../AudioElementProvider'

const ROOT = '/messed-up-timer/media'
const TICK = `${ROOT}/tick.mp3`
const TOCK = `${ROOT}/tock.mp3`
const ALARM = `${ROOT}/alarm.mp3`

export function useSounds({ timer }: { timer: React.MutableRefObject<Timer> }) {
    const { enableTicking } = useSelector((state: RootState) => state.settings)
    const { audio } = useContext(AudioElementContext)
    const lastTickTock = useRef<number>(Number.MAX_SAFE_INTEGER)
    const rafRef = useRef<number | null>(null)

    const onTick = useCallback(() => {
        if (timer.current && audio.current) {
            const remainingSeconds = Math.ceil(timer.current.remaining / 1000)
            if (enableTicking && lastTickTock.current !== remainingSeconds) {
                lastTickTock.current = remainingSeconds
                const sound =
                    remainingSeconds === 0 ? ALARM : remainingSeconds % 2 === 0 ? TICK : TOCK
                audio.current.src = sound
                audio.current.play().catch(() => {})
            }
        }
        rafRef.current = window.requestAnimationFrame(onTick)
    }, [audio, enableTicking, timer])

    useEffect(() => {
        rafRef.current = window.requestAnimationFrame(onTick)
        return () => {
            audio.current?.pause()
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [rafRef, audio, onTick])
}
