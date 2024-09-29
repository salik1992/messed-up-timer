import { useCallback, useContext } from 'react'
import { AudioElementContext } from '../AudioElementProvider'

const ALARM = '../media/alarm.mp3'

export function useSoundsEnabler() {
    const { audio } = useContext(AudioElementContext)

    return useCallback(
        () =>
            new Promise<void>((resolve) => {
                if (audio.current) {
                    const onPlay = () => {
                        audio.current?.pause()
                        audio.current?.removeEventListener('play', onPlay)
                        resolve()
                    }
                    audio.current.addEventListener('play', onPlay)
                    audio.current.src = ALARM
                    audio.current.play().catch(resolve)
                } else {
                    resolve()
                }
            }),
        [audio],
    )
}
