export interface IWeatherResponse {
  weatherToday: IWeatherToday;
  weatherFiveDay: IweatherFiveDay[];
}
export interface IWeatherToday {
  coord: Coordinate;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  rain?: Precipitation;
  snow?: Precipitation;
  sys: CurrentWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IweatherFiveDay {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: CurrentWeatherSys;
  dt_txt: string;
}

export interface Coordinate {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface ForecastPrecipitation {
  "3h": number;
}

export interface Precipitation extends ForecastPrecipitation {
  "1h"?: number;
}

export interface CurrentWeatherSys {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IForecastData {
  dataForecast: string;
  tempForecast: number;
  weather: Partial<Weather>[];
}

export interface IUniversal {
  dataToday: string;
  temperature: number;
  feelsLike: number;
  forecast: IForecastData;
}
