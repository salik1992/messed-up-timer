import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState, settings } from '@messed-up-timer/core'

export function ShowTimerPicker() {
    const { showTimerPicker } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(settings.setShowTimerPicker(!!event.target.checked))
        },
        [dispatch],
    )

    return (
        <div className="setting checkbox">
            <label htmlFor="showTimerPicker">
                Show Timer Picker:
                <input
                    type="checkbox"
                    id="showTimerPicker"
                    checked={showTimerPicker}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}
