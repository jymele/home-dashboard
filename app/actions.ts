'use server'

import { saveSettings } from '@/lib/settings';
import { revalidatePath } from 'next/cache';
import { Location } from '@/app/types'

export async function updateSettings(formData: FormData): Promise<void> {

    const city_name = formData.get('city_name') as string;
    const state_code = formData.get('state_code') as string;
    const country_code = formData.get('country_code') as string;

    const locationResponse = await fetch(`${process.env.OPENWEATHER_API_URL}/geo/1.0/direct?q=${city_name},${state_code},${country_code}&appid=${process.env.OPENWEATHER_API_KEY}`)
    const locations: Location[] = await locationResponse.json()



    const newSettings = {
        weatherApiKey: formData.get('weatherApiKey') as string,
        dashboardTitle: formData.get('dashboardTitle') as string,
        refreshInterval: Number(formData.get('refreshInterval')),
        units: formData.get('units') as "standard" | "metric" | "imperial",
        lang: formData.get('lang') as string,
        city_name: formData.get('city_name') as string,
        state_code: formData.get('state_code') as string,
        country_code: formData.get('country_code') as string,
        lon: locations[0]?.lon,
        lat: locations[0]?.lat
    };

    await saveSettings(newSettings);
    revalidatePath('/');
}