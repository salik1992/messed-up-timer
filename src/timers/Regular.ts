import { toDuration } from '../utils'
import { Timer } from './Timer'

export class RegularTimer implements Timer {
    private lastTick = Date.now()

    private _remaining: number

    constructor(public time: number) {
        this._remaining = time
    }

    tick() {
        const now = Date.now()
        const passed = now - this.lastTick
        this.lastTick = now
        this._remaining = Math.max(this._remaining - passed, 0)
    }

    get remaining() {
        return this._remaining
    }

    get estimate() {
        return toDuration(this.time)
    }
}
