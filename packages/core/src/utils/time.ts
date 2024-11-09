export function seconds(s: number) {
    return s * 1_000
}

export function minutes(m: number) {
    return seconds(m * 60)
}

export function hours(h: number) {
    return minutes(h * 60)
}

export function toDuration(ms: number) {
    let remaining = ms
    const h = Math.floor(remaining / hours(1))
    remaining -= hours(h)
    const m = Math.floor(remaining / minutes(1))
    remaining -= minutes(m)
    const s = Math.floor(remaining / seconds(1))
    const minuteOrOver = h > 0 || m > 0
    const hourOrOver = h > 0
    let out = `${s.toString().padStart(minuteOrOver ? 2 : 1, '0')}`
    if (minuteOrOver) {
        out = `${m.toString().padStart(hourOrOver ? 2 : 1, '0')}:${out}`
    }
    if (hourOrOver) {
        out = `${h}:${out}`
    }
    return out
}
