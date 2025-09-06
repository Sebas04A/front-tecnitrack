// src/components/citas/CalendarGrid.tsx
import React from 'react'

interface CalendarGridProps {
    now: Date
    currentDate: Date
    selectedDate: Date | null
    diasCompletos: Set<string>
    onDateSelect: (day: number) => void
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    now,
    currentDate,
    selectedDate,
    diasCompletos,
    onDateSelect,
}) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const getDayProps = (day: number): { className: string; disabled: boolean } => {
        const dayDate = new Date(year, month, day)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const isPast = dayDate < today
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
            2,
            '0'
        )}`
        const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === dayDate.getFullYear() &&
            selectedDate.getMonth() === dayDate.getMonth() &&
            selectedDate.getDate() === dayDate.getDate()
        const isFull = diasCompletos.has(dateStr)

        if (isPast) {
            return {
                className: `bg-unavailable-auto cursor-not-allowed`,
                disabled: true,
            }
        }
        if (isFull) {
            return {
                className: `bg-error-auto cursor-not-allowed`,
                disabled: true,
            }
        }
        if (isSelected) {
            return {
                className: `bg-primary-auto font-bold`,
                disabled: false,
            }
        }
        return {
            className: `bg-background-accent-auto hover:bg-primary-light-auto`,
            disabled: false,
        }
    }

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth })

    return (
        <div className='grid grid-cols-7 gap-2'>
            {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(day => (
                <div key={day} className='text-center font-semibold  text-sm'>
                    {day}
                </div>
            ))}

            {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} />
            ))}

            {days.map(day => {
                const { className, disabled } = getDayProps(day)
                return (
                    <button
                        key={day}
                        type='button'
                        onClick={() => onDateSelect(day)}
                        className={`flex items-center justify-center h-10 w-10 rounded-lg border transition-colors duration-200 ${className}`}
                        disabled={disabled}
                    >
                        {day}
                    </button>
                )
            })}
        </div>
    )
}
