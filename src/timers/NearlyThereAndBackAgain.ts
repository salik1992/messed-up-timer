import { seconds } from '../utils'
import { Timer } from './Timer'

const REVERSE_FROM_END = seconds(1)
const HANG_FOR = seconds(3)

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

    constructor(public time: number) {
        this._remaining = time
    }

    tick() {
        const now = Date.now()
        const passed = now - this.lastTick
        this.lastTick = now
        if (this._phase === Phase.DOWN) {
            this._remaining = Math.max(this._remaining - passed, 0)
            if (this._remaining < REVERSE_FROM_END) {
                this._hanging = 0
                this._phase = Phase.HANGING
            }
        } else if (this._phase === Phase.HANGING) {
            this._hanging += passed
            if (this._hanging > HANG_FOR) {
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
        return 'never'
    }
}
