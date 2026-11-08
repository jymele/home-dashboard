import DayWeather from './DayWeather';
import { connection } from 'next/server';
import { getSettings } from '@/lib/settings';
import { getWeeklyForecast } from '@/lib/weather';

export default async function WeeklyWeather() {
    const settings = await getSettings();
    await connection();

    if (!settings.lat || !settings.lon) {
        return (
            <div className="p-4">
                <h2 className="py-2 text-xl font-bold">Weekly Forecast</h2>
                <div className="p-4 ring ring-amber-200 rounded-sm text-zinc-600">
                    Please configure your location in the settings page to see the 7-day weather forecast.
                </div>
            </div>
        );
    }

    const weeklyForecast = await getWeeklyForecast(settings);
    const unitSymbol = settings.units === 'imperial' ? '°F' : '°C';

    return (
        <div className="p-4">
            <h2 className="py-2 text-xl font-bold">Weekly Forecast</h2>
            {weeklyForecast.length === 0 ? (
                <div className="p-4 ring ring-amber-200 rounded-sm text-zinc-600">
                    Unable to load the weekly forecast at this moment. Please check your network or weather settings.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {weeklyForecast.map((forecast, index) => (
                        <DayWeather
                            key={index}
                            date={forecast.date}
                            tempMin={forecast.tempMin}
                            tempMax={forecast.tempMax}
                            tempDay={forecast.tempDay}
                            description={forecast.description}
                            icon={forecast.icon}
                            unit={unitSymbol}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
