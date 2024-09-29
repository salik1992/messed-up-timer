import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setLagging } from './reducer'

export function SettingsLagging() {
    const { lagging } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChangeFrequency = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setLagging({
                    frequency: parseInt(event.target.value),
                    min: lagging.min,
                    max: lagging.max,
                }),
            )
        },
        [dispatch, lagging],
    )

    const onChangeMin = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(event.target.value)
            dispatch(
                setLagging({
                    frequency: lagging.frequency,
                    min: value,
                    max: Math.max(value, lagging.max),
                }),
            )
        },
        [dispatch, lagging],
    )

    const onChangeMax = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(event.target.value)
            dispatch(
                setLagging({
                    frequency: lagging.frequency,
                    min: Math.min(value, lagging.min),
                    max: value,
                }),
            )
        },
        [dispatch, lagging],
    )

    return (
        <div className="setting timer">
            <label htmlFor="frequency">
                How often lagging appears
                <input
                    id="frequency"
                    type="range"
                    value={lagging.frequency}
                    min={0}
                    max={10}
                    step={1}
                    onChange={onChangeFrequency}
                />
            </label>
            <label htmlFor="min">
                Minimal time for lag is {(lagging.min / 1000).toString().slice(0, 5)}s
                <input
                    id="min"
                    type="range"
                    value={lagging.min}
                    min={0}
                    max={10_000}
                    step={10}
                    onChange={onChangeMin}
                />
            </label>
            <label htmlFor="max">
                Maximum time for lag is {(lagging.max / 1000).toString().slice(0, 5)}s
                <input
                    id="max"
                    type="range"
                    value={lagging.max}
                    min={0}
                    max={10_000}
                    step={10}
                    onChange={onChangeMax}
                />
            </label>
        </div>
    )
}
