import DayWeather from './DayWeather';
import { connection } from 'next/server';
import { getSettings } from '@/lib/settings';
import { getWeeklyForecast } from '@/lib/weather';

export default async function WeeklyWeather() {
    const settings = await getSettings();
    await connection();

    if (!settings.lat || !settings.lon) {
        return null;
    }

    const weeklyForecast = await getWeeklyForecast(settings);
    const unitSymbol = settings.units === 'imperial' ? '°F' : '°C';

    return (
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mt-6 transition-all">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">7-Day Forecast</h2>
                        <p className="text-xs font-medium text-slate-500">
                            Upcoming conditions for {settings.city_name || 'your area'}
                        </p>
                    </div>
                </div>

                <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent border border-accent-200/60 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    7-Day Extended Outlook
                </div>
            </div>

            {/* Grid of Days */}
            <div className="pt-6">
                {weeklyForecast.length === 0 ? (
                    <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/70 text-center text-slate-500 text-sm">
                        Unable to load forecast data at this moment. Please check your network connection or API settings.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
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
        </section>
    );
}
