import { seconds, minutes, hours, toDuration } from './time'

describe('time', () => {
    describe('seconds', () => {
        it('should return as milliseconds', () => {
            expect(seconds(2)).toBe(2_000)
        })
    })

    describe('minutes', () => {
        it('should return as milliseconds', () => {
            expect(minutes(1)).toBe(60_000)
        })
    })

    describe('hours', () => {
        it('should return as milliseconds', () => {
            expect(hours(1)).toBe(60 * 60 * 1_000)
        })
    })

    describe('toDuration', () => {
        it.each([
            [seconds(1), '1'],
            [seconds(11), '11'],
            [minutes(1) + seconds(3), '1:03'],
            [minutes(12), '12:00'],
            [hours(1), '1:00:00'],
            [hours(2) + minutes(38) + seconds(15), '2:38:15'],
        ])('should format time %s as %s', (ms, duration) => {
            expect(toDuration(ms)).toBe(duration)
        })
    })
})
