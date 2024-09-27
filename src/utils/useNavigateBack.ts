import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useNavigateBack() {
    const navigate = useNavigate()

    return useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            navigate(-1)
        },
        [navigate],
    )
}
