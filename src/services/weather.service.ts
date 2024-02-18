import { apiConfig } from "../configs";
import { weatherRepository } from "../repositories";
import { ICity, ICoordinate, IWeatherResponse } from "../types";

class WeatherService {
  public async getWeatherForCity(dto: ICity): Promise<IWeatherResponse> {
    const weatherTodayUrl: string = `${apiConfig.OPEN_WEATHER}weather?q=${dto.city}&appid=${apiConfig.API_KEY}&units=metric`;

    const weatherFiveDayUrl: string = `${apiConfig.OPEN_WEATHER}forecast?q=${dto.city}&appid=${apiConfig.API_KEY}&units=metric`;

    return await weatherRepository.getWeatherForCity({
      weatherTodayUrl: weatherTodayUrl,
      weatherFiveDayUrl: weatherFiveDayUrl,
    });
  }

  public async getWeatherForLatLng(
    dto: ICoordinate,
  ): Promise<IWeatherResponse> {
    const weatherTodayUrl = `${apiConfig.OPEN_WEATHER}weather?lat=${Number(dto.latitude)}&lon=${Number(
      dto.longitude,
    )}&appid=${apiConfig.API_KEY}&units=metric`;

    const weatherFiveDayUrl = `${apiConfig.OPEN_WEATHER}forecast?lat=${Number(dto.latitude)}&lon=${Number(
      dto.longitude,
    )}&appid=${apiConfig.API_KEY}&units=metric`;

    return await weatherRepository.getWeatherForCity({
      weatherTodayUrl,
      weatherFiveDayUrl,
    });
  }
}

export const weatherService = new WeatherService();
