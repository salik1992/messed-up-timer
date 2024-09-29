import { toDuration } from '../utils'
import { Timer } from './Timer'

const LAG_CHANCE = 0.0025

const TICK_TIME = 60
const ESTIMATE_LOOPS = 10

export class LaggingTimer implements Timer {
    private lastTick = Date.now()

    private _remaining: number

    private _lagRemaining = 0

    public simulation = false

    private minLagTime: number

    private maxLagTime: number

    private lagChance: number

    private frequency: number

    constructor(
        public time: number,
        { frequency, min, max }: { frequency: number; min: number; max: number },
    ) {
        this.frequency = frequency
        this.lagChance = LAG_CHANCE * frequency
        this.minLagTime = min
        this.maxLagTime = max
        this._remaining = time
    }

    tick() {
        const now = Date.now()
        const passed = this.simulation ? TICK_TIME : now - this.lastTick
        this.lastTick = now
        if (this._lagRemaining > 0) {
            this._lagRemaining = Math.max(this._lagRemaining - passed, 0)
        } else if (Math.random() < this.lagChance) {
            this._lagRemaining =
                Math.random() * (this.maxLagTime - this.minLagTime) + this.minLagTime
        } else {
            this._remaining = Math.max(this._remaining - passed, 0)
        }
    }

    get remaining() {
        return this._remaining
    }

    get estimate() {
        const results: number[] = []
        for (let i = 0; i < ESTIMATE_LOOPS; i++) {
            const sim = new LaggingTimer(this.time, {
                frequency: this.frequency,
                min: this.minLagTime,
                max: this.maxLagTime,
            })
            sim.simulation = true
            let passed = 0
            while (sim.remaining > 0) {
                passed += TICK_TIME
                sim.tick()
            }
            results.push(passed)
        }
        return `on average ${toDuration(
            results.reduce((acc, passed) => acc + passed, 0) / ESTIMATE_LOOPS,
        )}`
    }

    get buffering() {
        return this._lagRemaining > 0
    }
}
