import React from 'react'

export default function GenericSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className='my-2'>
            <h2 className='text-xl font-bold text-primary '>{title}</h2>
            <div className='mt-4'>{children}</div>
        </section>
    )
}
