import axios from "axios";

import { ApiError } from "../errors";
import {
  IUrlLink,
  IweatherFiveDay,
  IWeatherResponse,
  IWeatherToday,
} from "../types";

class WeatherRepository {
  public async getWeatherForCity(dto: IUrlLink): Promise<IWeatherResponse> {
    const weatherToday: IWeatherToday = await axios
      .get(dto.weatherTodayUrl)
      .then((value) => value.data)
      .catch((error) => {
        if (error.response) {
          throw new ApiError(
            error.response.data.message,
            error.response.status,
          );
        }
      });

    const weatherFiveDay: IweatherFiveDay[] = await axios
      .get(dto.weatherFiveDayUrl)
      .then((value) => value.data.list)
      .catch((error) => {
        if (error.response) {
          throw new ApiError(
            error.response.data.message,
            error.response.status,
          );
        }
      });

    return { weatherToday, weatherFiveDay };
  }
}

export const weatherRepository = new WeatherRepository();
