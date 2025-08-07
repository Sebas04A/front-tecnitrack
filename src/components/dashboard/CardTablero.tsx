function CardTablero({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`bg-background-accent-auto p-6 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105 ${className}`}
        >
            {children}
        </div>
    )
}

export default CardTablero
