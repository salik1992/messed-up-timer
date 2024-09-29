import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setSpeedingUp } from './reducer'

export function SettingsSpeedingUp() {
    const { speedingUp } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChangeCoef = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setSpeedingUp({
                    coef: Math.round(parseFloat(event.target.value) * 10) / 10,
                    startAt: speedingUp.startAt,
                }),
            )
        },
        [dispatch, speedingUp],
    )

    const onChangeStartAt = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setSpeedingUp({
                    coef: speedingUp.coef,
                    startAt: parseInt(event.target.value) / 100,
                }),
            )
        },
        [dispatch, speedingUp],
    )

    return (
        <div className="setting timer">
            <label htmlFor="coef">
                Speeding Up {Math.round(speedingUp.coef * 10) / 10} times by the end
                <input
                    id="coef"
                    type="range"
                    value={speedingUp.coef}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={onChangeCoef}
                />
            </label>
            <label htmlFor="startAt">
                Speeding Up starts at {Math.round(speedingUp.startAt * 100)}% of progress
                <input
                    id="startAt"
                    type="range"
                    value={speedingUp.startAt * 100}
                    min={0}
                    max={100}
                    step={1}
                    onChange={onChangeStartAt}
                />
            </label>
        </div>
    )
}
