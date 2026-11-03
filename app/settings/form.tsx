import { getSettings } from '@/lib/settings';
import { updateSettings } from '@/app/actions';

export default async function SettingsForm() {
    const settings = await getSettings();
    
        return (
            <form action={updateSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
                <div className="flex gap-4 items-center">
                    <label>Dashboard Title:</label>
                    <input name="dashboardTitle" defaultValue={settings.dashboardTitle} />
                </div>
    
                <div className="flex gap-4 items-center">
                    <label>Weather API Key:</label>
                    <input name="weatherApiKey" defaultValue={settings.weatherApiKey} type="password" />
                </div>
    
                <label>
                    Refresh Interval (seconds):
                    <input name="refreshInterval" defaultValue={settings.refreshInterval} type="number" />
                </label>
    
                <label>
                    Units:
                    <input name="units" defaultValue={settings.units} />
                </label>
    
                <label>
                    Language:
                    <input name="lang" defaultValue={settings.lang} />
                </label>
    
                <label>
                    City Name:
                    <input name="city_name" defaultValue={settings.city_name} />
                </label>
    
                <label>
                    State Code:
                    <input name="state_code" defaultValue={settings.state_code} />
                </label>
    
                <label>
                    Country Code:
                    <input name="country_code" defaultValue={settings.country_code} />
                </label>
    
    
                <button type="submit">Save Settings</button>
            </form>
        );
}