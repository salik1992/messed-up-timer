import { seconds, toDuration } from '../utils'
import { Timer } from './Timer'

const MIN_LAG_TIME = seconds(1)
const MAX_LAG_TIME = seconds(5)
const LAG_CHANCE = 0.025

const TICK_TIME = 60
const ESTIMATE_LOOPS = 10

export class LaggingTimer implements Timer {
    private lastTick = Date.now()

    private _remaining: number

    private _lagRemaining = 0

    public simulation = false

    constructor(public time: number) {
        this._remaining = time
    }

    tick() {
        const now = Date.now()
        const passed = this.simulation ? TICK_TIME : now - this.lastTick
        this.lastTick = now
        if (this._lagRemaining > 0) {
            this._lagRemaining = Math.max(this._lagRemaining - passed, 0)
        } else if (Math.random() < LAG_CHANCE) {
            this._lagRemaining = Math.random() * (MAX_LAG_TIME - MIN_LAG_TIME) + MIN_LAG_TIME
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
            const sim = new LaggingTimer(this.time)
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
