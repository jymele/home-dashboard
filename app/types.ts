export interface Location {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface LocalNames {
  [languageCode: string]: string;
}