import { connection } from 'next/server';
import { getSettings } from '@/lib/settings';
import { WeatherResponse } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function MainDayWeather() {
    const settings = await getSettings();
    await connection();
    const date = new Date();

    if (!settings.lat || !settings.lon) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 text-center max-w-xl mx-auto my-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-accent-50 text-accent flex items-center justify-center mb-4">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Location Not Configured</h2>
                <p className="text-sm text-slate-500 mb-6">
                    Set your city and country in the settings panel to enable real-time local weather tracking and 7-day forecasts.
                </p>
                <Link
                    href="/settings"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-700 text-white text-sm font-medium shadow-xs transition-colors"
                >
                    Configure Location
                </Link>
            </div>
        );
    }

    const apiKey = settings.weatherApiKey || process.env.OPENWEATHER_API_KEY;
    const apiUrl = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org';
    const weatherResponse = await fetch(
        `${apiUrl}/data/2.5/weather?lat=${settings.lat}&lon=${settings.lon}&appid=${apiKey}&units=${settings.units || 'metric'}`
    );

    if (!weatherResponse.ok) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 text-center">
                <h3 className="text-lg font-semibold text-slate-800">Weather data temporarily unavailable</h3>
                <p className="text-xs text-slate-500 mt-1">Please verify your API key or network connection.</p>
            </div>
        );
    }

    const weather = (await weatherResponse.json()) as WeatherResponse;
    const icon = weather.weather?.[0]?.icon || '01d';
    const description = weather.weather?.[0]?.description || 'Clear';
    const tempUnit = settings.units === 'imperial' ? '°F' : '°C';
    const windUnit = settings.units === 'imperial' ? 'mph' : 'm/s';
    const locationString = [settings.city_name, settings.state_code, settings.country_code]
        .filter(Boolean)
        .join(', ');

    return (
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden transition-all">
            {/* Microsoft 365 top accent stroke */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-primary-500 to-accent" />

            <div className="p-6 sm:p-8">
                {/* Header: Date & Status Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Today&apos;s Conditions
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent-50 text-accent border border-accent-200/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Current
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </h1>
                    </div>

                    {locationString && (
                        <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{locationString}</span>
                        </div>
                    )}
                </div>

                {/* Main Hero: Temperature & Weather Summary */}
                <div className="py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                        {/* Weather icon in Fluent squircle */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-primary-50/70 border border-primary-100 flex items-center justify-center p-2 shadow-inner-xs shrink-0">
                            <Image
                                src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                                alt={description}
                                width={96}
                                height={96}
                                priority
                                className="object-contain drop-shadow-sm"
                            />
                        </div>

                        <div>
                            <div className="flex items-baseline justify-center sm:justify-start gap-1">
                                <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-primary">
                                    {Math.round(weather.main.temp)}
                                </span>
                                <span className="text-3xl sm:text-4xl font-semibold text-slate-500">
                                    {tempUnit}
                                </span>
                            </div>

                            <p className="text-lg sm:text-xl font-semibold text-slate-800 capitalize mt-1">
                                {description}
                            </p>

                            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs font-medium text-slate-500">
                                <span>Feels like <strong className="text-slate-700">{Math.round(weather.main.feels_like)}{tempUnit}</strong></span>
                                <span>•</span>
                                <span>High <strong className="text-slate-800">{Math.round(weather.main.temp_max)}{tempUnit}</strong></span>
                                <span>•</span>
                                <span>Low <strong className="text-slate-800">{Math.round(weather.main.temp_min)}{tempUnit}</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Micro Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 w-full md:w-auto">
                        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[11px] font-medium text-slate-400 block">Humidity</span>
                                <span className="text-sm font-bold text-slate-800">{weather.main.humidity}%</span>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[11px] font-medium text-slate-400 block">Wind</span>
                                <span className="text-sm font-bold text-slate-800">{Math.round(weather.wind.speed)} {windUnit}</span>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[11px] font-medium text-slate-400 block">Pressure</span>
                                <span className="text-sm font-bold text-slate-800">{weather.main.pressure} hPa</span>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[11px] font-medium text-slate-400 block">Visibility</span>
                                <span className="text-sm font-bold text-slate-800">
                                    {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
