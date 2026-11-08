import { getSettings } from '@/lib/settings';
import { updateSettings } from '@/app/actions';

export default async function SettingsForm() {
    const settings = await getSettings();

    return (
        <form action={updateSettings} className="space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">General Display</h2>
                        <p className="text-xs text-slate-500">Customize dashboard headers and behavior</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Dashboard Title
                        </label>
                        <input
                            name="dashboardTitle"
                            defaultValue={settings.dashboardTitle}
                            placeholder="My Home Dashboard"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Refresh Interval (seconds)
                        </label>
                        <input
                            name="refreshInterval"
                            type="number"
                            min="15"
                            defaultValue={settings.refreshInterval || 60}
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>
                </div>
            </div>

            {/* Location Settings */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Location Details</h2>
                        <p className="text-xs text-slate-500">Coordinates are auto-resolved from your location</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            City Name
                        </label>
                        <input
                            name="city_name"
                            defaultValue={settings.city_name}
                            placeholder="e.g. Pickering"
                            required
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            State / Province Code
                        </label>
                        <input
                            name="state_code"
                            defaultValue={settings.state_code}
                            placeholder="e.g. ON"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Country Code
                        </label>
                        <input
                            name="country_code"
                            defaultValue={settings.country_code}
                            placeholder="e.g. CA"
                            required
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>
                </div>

                {settings.lat && settings.lon && (
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/60 text-xs text-slate-600 flex items-center justify-between">
                        <span>Current Resolved GPS:</span>
                        <span className="font-mono text-slate-800 font-semibold">
                            {settings.lat.toFixed(4)}° N, {settings.lon.toFixed(4)}° W
                        </span>
                    </div>
                )}
            </div>

            {/* Units & Preferences */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Units & Localization</h2>
                        <p className="text-xs text-slate-500">Configure measurement standards and language</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Measurement Units
                        </label>
                        <select
                            name="units"
                            defaultValue={settings.units || 'metric'}
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        >
                            <option value="metric">Metric (°C, m/s, km)</option>
                            <option value="imperial">Imperial (°F, mph, mi)</option>
                            <option value="standard">Standard (Kelvin, m/s)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Language Code
                        </label>
                        <input
                            name="lang"
                            defaultValue={settings.lang || 'en'}
                            placeholder="en"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                        />
                    </div>
                </div>
            </div>

            {/* Custom API Key (Optional) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Custom API Key (Optional)</h2>
                        <p className="text-xs text-slate-500">Provide your own OpenWeather API key if desired</p>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        OpenWeather API Key
                    </label>
                    <input
                        name="weatherApiKey"
                        type="password"
                        defaultValue={settings.weatherApiKey}
                        placeholder="Leave empty to use configured system key"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-700 active:bg-primary-800 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                </button>
            </div>
        </form>
    );
}
