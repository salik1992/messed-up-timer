import { LaggingTimer } from './Lagging'
import { NearlyThereAndBackAgainTimer } from './NearlyThereAndBackAgain'
import { RegularTimer } from './Regular'
import { SlowingDownTimer } from './SlowingDown'
import { SpeedingUpTimer } from './SpeedingUp'
import type { Timer } from './Timer'

export type TimerTypes = 'lagging' | 'nearlyThereAndBack' | 'regular' | 'slowingDown' | 'speedingUp'

export type { Timer }

export const TIMERS = {
    lagging: LaggingTimer,
    nearlyThereAndBack: NearlyThereAndBackAgainTimer,
    regular: RegularTimer,
    slowingDown: SlowingDownTimer,
    speedingUp: SpeedingUpTimer,
} as Readonly<
    Record<TimerTypes, new <T extends Record<string, number>>(time: number, options?: T) => Timer>
>
