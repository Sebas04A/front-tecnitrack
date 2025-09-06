import React from 'react'

export default function ComponenteCambia({ time }: { time: number }) {
    // const [time, setTime] = React.useState(Date.now())
    // React.useEffect(() => {
    //     const interval = setInterval(() => setTime(Date.now()), 1000)
    //     return () => clearInterval(interval)
    // }, [])
    return <div>{time}</div>
}
