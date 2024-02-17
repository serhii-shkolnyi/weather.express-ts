import axios from "axios";

class WeatherRepository {
  public async getWeatherForCity(dto: any) {
    const weatherToday = await axios
      .get(dto.weatherTodayUrl)
      .then((value) => value.data);

    const weatherFiveDay = await axios
      .get(dto.weatherFiveDayUrl)
      .then((value) => value.data.list);

    return { weatherToday, weatherFiveDay };
  }
}

export const weatherRepository = new WeatherRepository();
