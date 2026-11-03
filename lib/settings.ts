import fs from 'fs/promises';
import path from 'path';

export interface Settings {
    weatherApiKey: string;
    dashboardTitle: string;
    refreshInterval: number;
    units: "standard" | "metric" | "imperial",
    lang: string,
    city_name: string,
    state_code: string,
    country_code: string
    lon?: number,
    lat?: number
}

const SETTINGS_FILE = path.join(process.cwd(), 'local-settings.json');

const DEFAULT_SETTINGS: Settings = {
    weatherApiKey: '',
    dashboardTitle: 'My Home Pi',
    refreshInterval: 60,
    units: "standard",
    lang: "en",
    city_name: "Pickering",
    state_code: "",
    country_code: "CA"
};

export async function getSettings(): Promise<Settings> {
    try {
        const fileContents = await fs.readFile(SETTINGS_FILE, 'utf8');
        const savedSettings: Partial<Settings> = JSON.parse(fileContents);
        return { ...DEFAULT_SETTINGS, ...savedSettings };
    } catch (error) {
        const err = error as NodeJS.ErrnoException;
        if (err.code === 'ENOENT') {
            return DEFAULT_SETTINGS;
        }
        console.error('Error reading settings:', error);
        return DEFAULT_SETTINGS;
    }
}

export async function saveSettings(newSettings: Partial<Settings>): Promise<Settings> {
    const currentSettings = await getSettings();
    const updatedSettings: Settings = { ...currentSettings, ...newSettings };

    await fs.writeFile(
        SETTINGS_FILE,
        JSON.stringify(updatedSettings, null, 2),
        'utf8'
    );

    return updatedSettings;
}