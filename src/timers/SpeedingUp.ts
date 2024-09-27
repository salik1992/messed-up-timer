import { toDuration } from '../utils'
import { SpeedAdjustingTimer } from './SpeedAdjustingTimer'
import { Timer } from './Timer'

const SPEED_UP_START = 0.5
const SPEED_UP_COEF = 3

export class SpeedingUpTimer extends SpeedAdjustingTimer implements Timer {
    constructor(time: number) {
        super(time, SPEED_UP_COEF, SPEED_UP_START)
        console.log(this.estimate)
    }

    coefOperation(coef: number, passed: number): number {
        return passed * coef
    }

    get estimate() {
        return toDuration(
            this.time - (this.time * this.startAt * ((this.coef - 1) / this.coef)) / 2,
        )
    }
}
