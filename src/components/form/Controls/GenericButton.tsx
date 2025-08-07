import { STYLE_BUTTON } from '../../../constants/component_styles'

type GenericButtonProps = {
    type: 'button' | 'submit' | 'reset'
    text: string
    className?: string
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const GenericButton = ({
    text,
    type,
    className,
    disabled,
    onClick,
}: {
    type: 'button' | 'submit' | 'reset'
    text: string
    className?: string
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    return (
        <button
            type={type}
            className={`
            p-3 m-4  rounded-md transition-colors text-base sm:text-lg md:text-xl
            ${
                disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-auto hover:bg-primary-dark-auto'
            }
            ${className}
            `}
            onClick={e => {
                if (disabled) {
                    e.preventDefault()
                }
                onClick?.(e)
            }}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default GenericButton

// className={`text-blue-500 hover:underline ${className}`}
