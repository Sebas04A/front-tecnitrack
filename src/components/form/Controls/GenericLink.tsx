import { useNavigate } from 'react-router-dom'

type GenericLinkProps = {
    to: string
    text: string
    className?: string
}

const GenericLink: React.FC<GenericLinkProps> = ({ to, text, className }) => {
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate(to)
    }

    return (
        <a href={to} onClick={handleClick} className={`text-primary hover:underline ${className}`}>
            {text}
        </a>
    )
}

export default GenericLink
