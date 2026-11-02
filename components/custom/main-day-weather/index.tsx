import { connection } from 'next/server'
import { Location } from '@/app/types'
import { settings } from "@/app/config"

export default async function MainDayWeather() {

    const response = await fetch(`${process.env.OPENWEATHER_API_URL}/geo/1.0/direct?q=${settings.city_name},${settings.state_code},${settings.country_code}&appid=${process.env.OPENWEATHER_API_KEY}`)
    const locations: Location[] = await response.json()
    const location: Location = locations[0]


    await connection()
    const date = new Date()

    return <div className="text-lg font-bold p-4">
        <h1>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1>
        <h2 className="py-2">{location.lat}, {location.lon}, {location.country}</h2>
    </div>
}