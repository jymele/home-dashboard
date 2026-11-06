import { connection } from 'next/server'
import { getSettings } from '@/lib/settings';
import { WeatherResponse } from '@/app/types';

export default async function MainDayWeather() {
    const settings = await getSettings();

    await connection()
    const date = new Date()

    const weatherResponse = await fetch(`${process.env.OPENWEATHER_API_URL}/data/2.5/weather?lat=${settings.lat}&lon=${settings.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=${settings.units}`)
    // console.log(`${process.env.OPENWEATHER_API_URL}/data/2.5/weather?lat=${settings.lat}&lon=${settings.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=${settings.units}`)
    const weather = await weatherResponse.json() as WeatherResponse
    // console.log(weather)

    if (!settings.lat || !settings.lon) {
        return <div className="text-lg font-bold p-4">
            <h1>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1>
            <h2 className="py-2">Please set your location in the settings page.</h2>
        </div>
    }

    return <div className="text-lg font-bold p-4">
        <h1>{ settings.dashboardTitle }</h1>
        <h2>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
        <h2 className="py-2">{`${weather.main.temp}°${settings.units === 'metric' ? 'C' : 'F'}`}</h2>
        <h2 className="py-2">{weather.weather[0].description}</h2>
    </div>
}