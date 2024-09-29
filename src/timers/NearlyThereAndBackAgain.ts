import { Timer } from './Timer'

enum Phase {
    DOWN,
    HANGING,
    UP,
}

export class NearlyThereAndBackAgainTimer implements Timer {
    private lastTick = Date.now()

    private _remaining: number

    private _hanging = 0

    private _phase = Phase.DOWN

    private stopAt: number

    private stopFor: number

    constructor(public time: number, { stopAt, stopFor }: { stopAt: number; stopFor: number }) {
        this.stopAt = stopAt
        this.stopFor = stopFor
        this._remaining = time
    }

    tick() {
        const now = Date.now()
        const passed = now - this.lastTick
        this.lastTick = now
        if (this._phase === Phase.DOWN) {
            this._remaining = Math.max(this._remaining - passed, 0)
            if (this._remaining < this.stopAt) {
                this._hanging = 0
                this._phase = Phase.HANGING
            }
        } else if (this._phase === Phase.HANGING) {
            this._hanging += passed
            if (this._hanging > this.stopFor) {
                this._phase = Phase.UP
            }
        } else {
            this._remaining = Math.min(this.remaining + passed, this.time)
            if (this._remaining >= this.time) {
                this._phase = Phase.DOWN
            }
        }
    }

    get remaining() {
        return this._remaining
    }

    get estimate() {
        return 'never finishes'
    }
}
