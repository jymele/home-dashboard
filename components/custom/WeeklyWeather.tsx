import DayWeather from "./DayWeather"
import { connection } from 'next/server'
import { getSettings } from '@/lib/settings';
// import { setTimeout } from 'node:timers/promises';

export default async function WeeklyWeather() {
    const settings = await getSettings();
    await connection()
    const date = new Date()

    // await setTimeout(1000) // Wait for 1 second to avoid rate limiting
    // const weatherForecastResponse = await fetch(`${process.env.OPENWEATHER_API_URL}/data/2.5/forecast/daily?lat=${settings.lat}&lon=${settings.lon}&cnt=7&appid=${process.env.OPENWEATHER_API_KEY}&units=${settings.units}`)
    // const weatherForecast = await weatherForecastResponse.json()
    // console.log(weatherForecast)
    console.log((`${process.env.OPENWEATHER_API_URL}/data/2.5/forecast/daily?lat=${settings.lat}&lon=${settings.lon}&cnt=7&appid=${process.env.OPENWEATHER_API_KEY}&units=${settings.units}`))

    const days = [ 1, 2, 3, 4, 5, 6, 7]

    return <div className="p-4">
        <h2 className="py-2">Weekly Forecast</h2>
        <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => <DayWeather key={index} date={new Date(date.setDate(date.getDate() + 1))} />)}
    </div>
    </div>
}