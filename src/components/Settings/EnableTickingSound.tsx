import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { useCallback } from 'react'
import { setEnableTicking } from './reducer'

export function EnableTickingSound() {
    const { enableTicking } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setEnableTicking(!!event.target.checked))
        },
        [dispatch],
    )

    return (
        <div className="setting checkbox">
            <label htmlFor="enableTicking">
                Enable Ticking Sound:
                <input
                    type="checkbox"
                    id="enableTicking"
                    checked={enableTicking}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}
