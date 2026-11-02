'use client'

type Props = {
    date: Date
}

export default function DayWeather({ date }: Props) {
    return <div className="p-2 flex items-center justify-center ring ring-amber-200 rounded-sm">{date.toLocaleDateString()}</div>
}