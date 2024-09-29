import { useCallback, useEffect, useState } from 'react'

const BUTTONS = 200

export function useFitSize(
    progress: React.RefObject<HTMLDivElement>,
    duration: React.RefObject<HTMLDivElement>,
    spinner: React.RefObject<HTMLDivElement>,
) {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    const onResize = useCallback(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        const maxSize = Math.min(size.width, size.height - BUTTONS)
        const progressSize = maxSize * 0.9
        if (progress.current) {
            progress.current.style.width = `${progressSize}px`
            progress.current.style.height = `${progressSize}px`
        }
        const fontSize = maxSize * 0.15
        const offset = (progressSize + fontSize) / 2
        if (duration.current) {
            duration.current.style.fontSize = `${fontSize}px`
            duration.current.style.transform = `translateY(-${offset}px)`
        }
        if (spinner.current) {
            spinner.current.style.transform = `translate(-40px, ${progressSize / 3}px)`
        }
    }, [size, duration, progress, spinner])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [onResize])
}
