import { connection } from 'next/server';
import { getSettings } from '@/lib/settings';
import { WeatherResponse } from '@/app/types';
import Image from 'next/image';

export default async function MainDayWeather() {
    const settings = await getSettings();
    await connection();
    const date = new Date();

    if (!settings.lat || !settings.lon) {
        return (
            <div className="text-lg font-bold p-4">
                <h1>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1>
                <h2 className="py-2 text-zinc-600">Please set your location in the settings page.</h2>
            </div>
        );
    }

    const apiKey = settings.weatherApiKey || process.env.OPENWEATHER_API_KEY;
    const apiUrl = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org';
    const weatherResponse = await fetch(`${apiUrl}/data/2.5/weather?lat=${settings.lat}&lon=${settings.lon}&appid=${apiKey}&units=${settings.units}`);

    if (!weatherResponse.ok) {
        return (
            <div className="text-lg font-bold p-4">
                <h1>{settings.dashboardTitle}</h1>
                <h2>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
                <h2 className="py-2 text-zinc-600">Weather data is currently unavailable.</h2>
            </div>
        );
    }

    const weather = await weatherResponse.json() as WeatherResponse;
    const icon = weather.weather?.[0]?.icon || '01d';
    const description = weather.weather?.[0]?.description || '';
    const tempUnit = settings.units === 'imperial' ? 'F' : 'C';

    return (
        <div className="text-lg font-bold p-4">
            <h1>{settings.dashboardTitle}</h1>
            <h2>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
            <Image
                src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                alt={description}
                width={150}
                height={150}
                priority
            />
            <h2 className="">{`${weather.main.temp}°${tempUnit}`}</h2>
            <h2 className="capitalize">{description}</h2>
        </div>
    );
}
