import { Timer } from './Timer'

export abstract class SpeedAdjustingTimer implements Timer {
    private lastTick = Date.now()

    private _remaining: number

    constructor(public time: number, protected coef: number, protected startAt: number) {
        this._remaining = time
    }

    abstract coefOperation(coef: number, passed: number): number

    tick() {
        const now = Date.now()
        let passed = now - this.lastTick
        this.lastTick = now
        const remainingPercentage = this._remaining / this.time
        if (remainingPercentage < this.startAt) {
            const x1 = 1 - this.startAt
            const x = 1 - remainingPercentage
            const x2 = 1
            const y1 = 1
            const y2 = this.coef
            const coef = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
            passed = this.coefOperation(coef, passed)
        }
        this._remaining = Math.max(this._remaining - passed, 0)
    }

    get remaining() {
        return this._remaining
    }

    abstract get estimate(): string
}
