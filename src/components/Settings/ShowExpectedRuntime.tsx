import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { useCallback } from 'react'
import { setShowExpectedRuntime } from './reducer'

export function ShowExpectedRuntime() {
    const { showExpectedRuntime } = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setShowExpectedRuntime(!!event.target.checked))
        },
        [dispatch],
    )

    return (
        <div className="setting checkbox">
            <label htmlFor="showExpectedRuntime">
                Show Expected Runtime:
                <input
                    type="checkbox"
                    id="showExpectedRuntime"
                    checked={showExpectedRuntime}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}
