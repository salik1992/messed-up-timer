import { createContext, useRef } from 'react'

export const AudioElementContext = createContext<{ audio: React.RefObject<HTMLAudioElement> }>({
    audio: { current: null },
})

type Props = React.PropsWithChildren<{}>

export function AudioElementProvider({ children }: Props) {
    const audio = useRef<HTMLAudioElement>(null)

    return (
        <AudioElementContext.Provider value={{ audio }}>
            <audio ref={audio} />
            {children}
        </AudioElementContext.Provider>
    )
}
