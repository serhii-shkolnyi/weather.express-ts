import { IweatherFiveDay, IWeatherToday } from "../types";

export class WeatherPresenter {
  public static weatherResponse(
    weatherToday: IWeatherToday,
    weatherFiveDay: IweatherFiveDay,
  ) {
    return {
      weatherToday: this.weatherTodayResponse(weatherToday),
      weatherFiveDay: this.weatherFiveDayResponse(weatherFiveDay),
    };
  }

  public static weatherTodayResponse(weatherToday: IWeatherToday) {
    return {
      coord: weatherToday.coord,
      // weather: weatherToday.weather,
      // base: weatherToday.base,
      // main: weatherToday.main,
      // visibility: weatherToday.visibility,
      // wind: weatherToday.wind,
      // clouds: weatherToday.clouds,
      // dt: weatherToday.dt,
      // rain: weatherToday.rain,
      // snow: weatherToday.snow,
      // sys: weatherToday.sys,
      // timezone: weatherToday.timezone,
      // id: weatherToday.id,
      // name: weatherToday.name,
      // cod: weatherToday.cod,
    };
  }

  public static weatherFiveDayResponse(weatherFiveDay: IweatherFiveDay) {
    return {
      // dt: weatherFiveDay.dt,
      // main: weatherFiveDay.main,
      // weather: weatherFiveDay.weather,
      // clouds: weatherFiveDay.clouds,
      // wind: weatherFiveDay.wind,
      // visibility: weatherFiveDay.visibility,
      // pop: weatherFiveDay.pop,
      // sys: weatherFiveDay.sys,
      dt_txt: weatherFiveDay.dt_txt,
    };
  }
}
