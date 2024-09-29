import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { seconds } from '../../utils'
import { setNearlyThereAndBack } from './reducer'

export function SettingsNearlyThereAndBack() {
    const { nearlyThereAndBack } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChangeStopAt = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setNearlyThereAndBack({
                    stopAt: seconds(parseInt(event.target.value)),
                    stopFor: nearlyThereAndBack.stopFor,
                }),
            )
        },
        [dispatch, nearlyThereAndBack],
    )

    const onChangeStopFor = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setNearlyThereAndBack({
                    stopAt: nearlyThereAndBack.stopAt,
                    stopFor: seconds(parseInt(event.target.value)),
                }),
            )
        },
        [dispatch, nearlyThereAndBack],
    )

    return (
        <div className="setting timer">
            <label htmlFor="stopAt">
                Countdown stops {Math.round(nearlyThereAndBack.stopAt / 1000)}s from the end
                <input
                    id="stopAt"
                    type="range"
                    value={Math.round(nearlyThereAndBack.stopAt / 1000)}
                    min={1}
                    max={10}
                    step={1}
                    onChange={onChangeStopAt}
                />
            </label>
            <label htmlFor="stopFor">
                Countdown stops for {Math.round(nearlyThereAndBack.stopFor / 1000)}s
                <input
                    id="stopFor"
                    type="range"
                    value={Math.round(nearlyThereAndBack.stopFor / 1000)}
                    min={0}
                    max={10}
                    step={1}
                    onChange={onChangeStopFor}
                />
            </label>
        </div>
    )
}
