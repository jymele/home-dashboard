import DayWeather from "./DayWeather"
import { connection } from 'next/server'

export default async function WeeklyWeather() {
    await connection()
    const date = new Date()
    const day = date.getDay()
    // console.log(day)

    const days = [ 1, 2, 3, 4, 5, 6, 7]

    return <div>
        <h2 className="py-2">Weekly Forecast</h2>
        <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => <DayWeather key={index} date={new Date(date.setDate(date.getDate() + 1))} />)}
    </div>
    </div>
}