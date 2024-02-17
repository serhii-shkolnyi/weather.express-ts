import { apiConfig } from "../configs";
import { weatherRepository } from "../repositories";

class WeatherService {
  public async getWeatherForCity(dto: any) {
    const weatherTodayUrl = `${apiConfig.OPEN_WEATHER}weather?q=${dto.city}&appid=${apiConfig.API_KEY}&units=metric`;
    const weatherFiveDayUrl = `${apiConfig.OPEN_WEATHER}forecast?q=${dto.city}&appid=${apiConfig.API_KEY}&units=metric`;
    return await weatherRepository.getWeatherForCity({
      weatherTodayUrl,
      weatherFiveDayUrl,
    });
  }

  public async getWeatherForLatLng(dto: any) {
    const weatherTodayUrl = `${apiConfig.OPEN_WEATHER}weather?lat=${Number(dto.latitude)}&lon=${Number(dto.longitude)}&appid=${apiConfig.API_KEY}&units=metric`;
    const weatherFiveDayUrl = `${apiConfig.OPEN_WEATHER}forecast?lat=${Number(dto.latitude)}&lon=${Number(dto.longitude)}&appid=${apiConfig.API_KEY}&units=metric`;
    return await weatherRepository.getWeatherForCity({
      weatherTodayUrl,
      weatherFiveDayUrl,
    });
  }
}

export const weatherService = new WeatherService();
