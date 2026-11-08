import { Settings } from './settings';
import { DailyForecast } from '@/app/types';

/**
 * Maps WMO Weather Interpretation Codes to OpenWeatherMap icon names and human-readable descriptions.
 */
export function mapWmoCodeToWeather(code: number): { description: string; icon: string } {
    switch (code) {
        case 0:
            return { description: "Clear sky", icon: "01d" };
        case 1:
            return { description: "Mainly clear", icon: "02d" };
        case 2:
            return { description: "Partly cloudy", icon: "03d" };
        case 3:
            return { description: "Overcast", icon: "04d" };
        case 45:
        case 48:
            return { description: "Fog", icon: "50d" };
        case 51:
            return { description: "Light drizzle", icon: "09d" };
        case 53:
            return { description: "Moderate drizzle", icon: "09d" };
        case 55:
            return { description: "Dense drizzle", icon: "09d" };
        case 56:
        case 57:
            return { description: "Freezing drizzle", icon: "09d" };
        case 61:
            return { description: "Slight rain", icon: "10d" };
        case 63:
            return { description: "Moderate rain", icon: "10d" };
        case 65:
            return { description: "Heavy rain", icon: "10d" };
        case 66:
        case 67:
            return { description: "Freezing rain", icon: "13d" };
        case 71:
            return { description: "Slight snow", icon: "13d" };
        case 73:
            return { description: "Moderate snow", icon: "13d" };
        case 75:
            return { description: "Heavy snow", icon: "13d" };
        case 77:
            return { description: "Snow grains", icon: "13d" };
        case 80:
            return { description: "Slight rain showers", icon: "09d" };
        case 81:
            return { description: "Moderate rain showers", icon: "09d" };
        case 82:
            return { description: "Violent rain showers", icon: "09d" };
        case 85:
        case 86:
            return { description: "Snow showers", icon: "13d" };
        case 95:
            return { description: "Thunderstorm", icon: "11d" };
        case 96:
        case 99:
            return { description: "Thunderstorm with hail", icon: "11d" };
        default:
            return { description: "Partly cloudy", icon: "02d" };
    }
}

interface OpenWeatherDailyItem {
    dt: number;
    temp: {
        min: number;
        max: number;
        day?: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
}

interface OpenWeatherDailyResponse {
    cod?: string | number;
    list?: OpenWeatherDailyItem[];
}

interface OpenMeteoDailyResponse {
    daily?: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
}

/**
 * Retrieves the 7-day weather forecast.
 * Tries OpenWeather daily forecast first; if unauthorized (e.g. on free tier) or unavailable,
 * gracefully falls back to Open-Meteo.
 */
export async function getWeeklyForecast(settings: Settings): Promise<DailyForecast[]> {
    if (!settings.lat || !settings.lon) {
        return [];
    }

    const apiKey = settings.weatherApiKey || process.env.OPENWEATHER_API_KEY;
    const apiUrl = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org';
    const units = settings.units || 'metric';

    // 1. Try OpenWeather daily forecast if API key is present
    if (apiKey) {
        try {
            const endpoint = `${apiUrl}/data/2.5/forecast/daily?lat=${settings.lat}&lon=${settings.lon}&cnt=8&appid=${apiKey}&units=${units}`;
            const res = await fetch(endpoint, {
                next: { revalidate: settings.refreshInterval || 1800 }
            });

            if (res.ok) {
                const data = (await res.json()) as OpenWeatherDailyResponse;
                if (data.list && Array.isArray(data.list) && data.list.length > 1) {
                    // Skip today (index 0) and take next 7 days (index 1 to 7)
                    return data.list.slice(1, 8).map((item) => ({
                        date: new Date(item.dt * 1000),
                        tempMin: item.temp.min,
                        tempMax: item.temp.max,
                        tempDay: item.temp.day,
                        description: item.weather[0]?.description || '',
                        icon: item.weather[0]?.icon || '01d',
                    }));
                }
            }
        } catch (err) {
            console.warn('OpenWeather daily forecast request failed:', err);
        }
    }

    // 2. Fallback to Open-Meteo (free 7-day daily forecast, no key required)
    try {
        const tempUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
        const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${settings.lat}&longitude=${settings.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=8&temperature_unit=${tempUnit}`;

        const omRes = await fetch(omUrl, {
            next: { revalidate: settings.refreshInterval || 1800 }
        });

        if (omRes.ok) {
            const omData = (await omRes.json()) as OpenMeteoDailyResponse;
            if (omData.daily && Array.isArray(omData.daily.time)) {
                const results: DailyForecast[] = [];
                const total = Math.min(omData.daily.time.length, 8);

                // Take upcoming 7 days starting from tomorrow (index 1)
                for (let i = 1; i < total; i++) {
                    const timeStr = omData.daily.time[i];
                    const [year, month, day] = timeStr.split('-').map(Number);
                    // Construct local midnight date to prevent timezone day-shift
                    const date = new Date(year, month - 1, day);

                    const weatherInfo = mapWmoCodeToWeather(omData.daily.weather_code[i]);
                    results.push({
                        date,
                        tempMin: omData.daily.temperature_2m_min[i],
                        tempMax: omData.daily.temperature_2m_max[i],
                        description: weatherInfo.description,
                        icon: weatherInfo.icon,
                    });
                }

                return results;
            }
        }
    } catch (err) {
        console.error('Open-Meteo forecast fallback failed:', err);
    }

    return [];
}
