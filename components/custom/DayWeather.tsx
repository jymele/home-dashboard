'use client';

import Image from 'next/image';

export type DayWeatherProps = {
    date: Date;
    tempMin?: number;
    tempMax?: number;
    tempDay?: number;
    description?: string;
    icon?: string;
    unit?: string;
};

export default function DayWeather({
    date,
    tempMin,
    tempMax,
    tempDay,
    description,
    icon,
    unit = '°C'
}: DayWeatherProps) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayMonth = `${d.toLocaleDateString('en-US', { day: 'numeric' })} ${d.toLocaleDateString('en-US', { month: 'short' })}`;

    return (
        <div className="group relative p-3.5 sm:p-4 flex flex-col items-center justify-between rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-center min-h-[200px]">
            {/* Header: Weekday & Date pill */}
            <div className="w-full">
                <div className="font-semibold text-sm text-slate-800 group-hover:text-primary transition-colors">
                    {weekday}
                </div>
                <div className="inline-block text-[11px] font-medium text-slate-500 bg-white group-hover:bg-primary-50 px-2 py-0.5 rounded-full border border-slate-200/60 mt-1 shadow-2xs transition-colors">
                    {dayMonth}
                </div>
            </div>

            {/* Icon */}
            {icon && (
                <div className="relative w-14 h-14 my-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Image
                        src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                        alt={description || 'Weather condition'}
                        width={56}
                        height={56}
                        className="object-contain drop-shadow-2xs"
                    />
                </div>
            )}

            {/* Temperatures & Condition */}
            <div className="w-full">
                {tempMax !== undefined && tempMin !== undefined ? (
                    <div>
                        <div className="text-sm flex items-center justify-center gap-1.5 font-bold text-slate-900">
                            <span>{Math.round(tempMax)}°</span>
                            <span className="text-xs font-normal text-slate-400">/</span>
                            <span className="text-xs font-medium text-slate-500">{Math.round(tempMin)}°</span>
                        </div>
                        {/* Fluent Temperature Indicator Bar */}
                        <div className="w-12 h-1 mx-auto my-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>
                    </div>
                ) : tempDay !== undefined ? (
                    <div className="text-sm font-bold text-slate-900">
                        {Math.round(tempDay)}{unit}
                    </div>
                ) : null}

                {description && (
                    <div
                        className="text-[11px] font-medium text-slate-600 capitalize truncate mt-0.5 max-w-full"
                        title={description}
                    >
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
}
