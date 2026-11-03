import { connection } from 'next/server'
import { getSettings } from '@/lib/settings';

export default async function MainDayWeather() {
    const settings = await getSettings();

    await connection()
    const date = new Date()

    if (!settings.lat || !settings.lon) {
        return <div className="text-lg font-bold p-4">
            <h1>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1>
            <h2 className="py-2">Please set your location in the settings page.</h2>
        </div>
    }

    return <div className="text-lg font-bold p-4">
        <h1>{ settings.dashboardTitle }</h1>
        <h2>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
        <h2 className="py-2">{settings.lat}, {settings.lon}, {settings.country_code}</h2>
    </div>
}