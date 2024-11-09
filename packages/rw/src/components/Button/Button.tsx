import './Button.scss'

type Props = React.PropsWithChildren<{
    onClick: () => void
    type?: 'default' | 'success' | 'danger'
}>

export function Button({ onClick, type = 'default', children }: Props) {
    return (
        <div className={`button ${type}`} onClick={onClick}>
            {children}
        </div>
    )
}
