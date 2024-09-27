import { toDuration } from '../utils'
import { SpeedAdjustingTimer } from './SpeedAdjustingTimer'
import { Timer } from './Timer'

const SLOW_DOWN_START = 0.5
const SLOW_DOWN_COEF = 3

export class SlowingDownTimer extends SpeedAdjustingTimer implements Timer {
    constructor(time: number) {
        super(time, SLOW_DOWN_COEF, SLOW_DOWN_START)
    }

    coefOperation(coef: number, passed: number): number {
        return passed / coef
    }

    get estimate() {
        return toDuration(this.time + (this.time * this.startAt * (this.coef - 1)) / 2)
    }
}
