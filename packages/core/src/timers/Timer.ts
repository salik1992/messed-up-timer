export interface Timer {
    tick(): void
    readonly time: number
    readonly estimate: string
    readonly remaining: number
    readonly buffering?: boolean
}
