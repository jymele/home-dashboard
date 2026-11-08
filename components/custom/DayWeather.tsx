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
        <div className="p-3 flex flex-col items-center justify-between ring ring-amber-200 rounded-sm bg-amber-50/20 hover:bg-amber-50/40 transition-colors min-h-[170px] text-center">
            <div>
                <div className="font-semibold text-base">{weekday}</div>
                <div className="text-xs text-zinc-500">{dayMonth}</div>
            </div>

            {icon && (
                <div className="relative w-14 h-14 my-1 flex items-center justify-center">
                    <Image
                        src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                        alt={description || 'Weather condition'}
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>
            )}

            <div className="w-full">
                {tempMax !== undefined && tempMin !== undefined ? (
                    <div className="text-sm font-semibold">
                        {Math.round(tempMax)}° <span className="text-zinc-500 font-normal">/ {Math.round(tempMin)}°</span>
                    </div>
                ) : tempDay !== undefined ? (
                    <div className="text-sm font-semibold">
                        {Math.round(tempDay)}{unit}
                    </div>
                ) : null}

                {description && (
                    <div className="text-xs text-zinc-600 capitalize truncate mt-0.5" title={description}>
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
}
