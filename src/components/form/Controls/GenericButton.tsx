import { STYLE_BUTTON } from '../../../constants/component_styles'

const GenericButton = ({
    icon,
    text,
    type = 'button',
    className,
    disabled,
    onClick,
}: {
    type?: 'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    text?: string
    className?: string
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    return (
        <button
            type={type}
            className={`
            p-3 m-4  rounded-md transition-colors sm:text-md md:text-lg
            ${
                disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-auto hover:bg-primary-light-auto'
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
            <div className='flex items-center gap-2'>
                {icon && <span className='flex items-center justify-center'>{icon}</span>}
                {text && (
                    <span className={`text-center w-full ${icon ? 'hidden md:inline' : 'block'} `}>
                        {text}
                    </span>
                )}
            </div>
        </button>
    )
}

export default GenericButton

// className={`text-blue-500 hover:underline ${className}`}
