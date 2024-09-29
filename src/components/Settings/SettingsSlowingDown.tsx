import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setSlowingDown } from './reducer'

export function SettingsSlowingDown() {
    const { slowingDown } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChangeCoef = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setSlowingDown({
                    coef: Math.round(parseFloat(event.target.value) * 10) / 10,
                    startAt: slowingDown.startAt,
                }),
            )
        },
        [dispatch, slowingDown],
    )

    const onChangeStartAt = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setSlowingDown({
                    coef: slowingDown.coef,
                    startAt: parseInt(event.target.value) / 100,
                }),
            )
        },
        [dispatch, slowingDown],
    )

    return (
        <div className="setting timer">
            <label htmlFor="coef">
                Slow Down {Math.round(slowingDown.coef * 10) / 10} times by the end
                <input
                    id="coef"
                    type="range"
                    value={slowingDown.coef}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={onChangeCoef}
                />
            </label>
            <label htmlFor="startAt">
                Slowing Down starts at {Math.round(slowingDown.startAt * 100)}% of progress
                <input
                    id="startAt"
                    type="range"
                    value={slowingDown.startAt * 100}
                    min={0}
                    max={100}
                    step={1}
                    onChange={onChangeStartAt}
                />
            </label>
        </div>
    )
}
