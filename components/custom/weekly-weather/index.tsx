'use client'
import DayWeather from "./DayWeather"

export default function WeeklyWeather() {
    // const date = new Date()
    // const day = date.getDay()
    // console.log(day)

    const days = [0, 1, 2, 3, 4, 5, 6]

    return <div>
        <h2 className="py-2">Weekly Forecast</h2>
        <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => <DayWeather key={index} />)}
    </div>
    </div>
}