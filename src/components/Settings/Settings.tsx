import { Link } from 'react-router-dom'
import { useNavigateBack } from '../../utils'

export function Settings() {
    const back = useNavigateBack()

    return (
        <div className="page about">
            <header>
                <Link to="/about">About</Link>
                <Link to={'..'} onClick={back}>
                    Back
                </Link>
            </header>
            <main>TODO</main>
        </div>
    )
}
