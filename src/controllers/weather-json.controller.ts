import { NextFunction, Request, Response } from "express";

import { WeatherPresenter } from "../presenters";
import { weatherService } from "../services";
import { IBody, IweatherFiveDay } from "../types";

class WeatherJsonController {
  public async getWeatherJson(req: Request, res: Response, next: NextFunction) {
    const { city, latitude, longitude } = req.body as IBody;

    if (city) {
      try {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForCity({ city });

        let newWeatherFiveDay = {} as IweatherFiveDay;
        weatherFiveDay.forEach((value) => (newWeatherFiveDay = value));

        res.status(200).json({
          data: WeatherPresenter.weatherResponse(
            weatherToday,
            newWeatherFiveDay,
          ),
        });
      } catch (e) {
        next(e);
      }
    }
    if (latitude && longitude) {
      const { weatherToday, weatherFiveDay } =
        await weatherService.getWeatherForLatLng({ latitude, longitude });

      let newWeatherFiveDay = {} as IweatherFiveDay;
      weatherFiveDay.forEach((value) => (newWeatherFiveDay = value));

      res.status(200).json({
        data: WeatherPresenter.weatherResponse(weatherToday, newWeatherFiveDay),
      });
    }
  }
}

export const weatherJsonController = new WeatherJsonController();
