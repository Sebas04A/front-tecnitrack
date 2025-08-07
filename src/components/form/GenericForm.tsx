interface GenericFormProps {
    title?: string
    error?: string
    children?: React.ReactNode
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const GenericForm: React.FC<GenericFormProps> = ({ title, error, children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className='w-full  p-6  flex flex-col gap-4'>
            {title && (
                <h2 className={`font-bold  text-2xl  mb-4 text-center text-primary`}>{title}</h2>
            )}
            {error && <p className={`text-error mb-4 text-center`}>{error}</p>}
            {children}
        </form>
    )
}

export default GenericForm
