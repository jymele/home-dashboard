type Settings = {
    units: "standard" | "metric" | "imperial",
    lang: string,
    city_name: string,
    state_code?: string,
    country_code: string
}

export const settings: Settings = {
    units: "standard",
    lang: "en",
    city_name: "Pickering",
    state_code:"",
    country_code: "CA"
}