import { toDuration } from '../utils'
import { SpeedAdjustingTimer } from './SpeedAdjustingTimer'
import { Timer } from './Timer'

export class SpeedingUpTimer extends SpeedAdjustingTimer implements Timer {
    constructor(time: number, { coef, startAt }: { coef: number; startAt: number }) {
        super(time, coef, startAt)
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
