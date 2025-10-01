import React from 'react'

export default function GenericRowForm({ children }: { children: React.ReactNode }) {
    return <div className='flex flex-wrap gap-4 w-full items-center mt-2'>{children}</div>
}
