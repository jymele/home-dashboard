'use client'

type Props = {
    date: Date
}

export default function DayWeather({ date }: Props) {
    return <><div className="p-2 flex flex-col items-center justify-center ring ring-amber-200 rounded-sm">
        <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
        <div>{date.toLocaleDateString("en-US", { day: "numeric" })} {date.toLocaleDateString("en-US", { month: "short" })}</div>

    </div></>
}