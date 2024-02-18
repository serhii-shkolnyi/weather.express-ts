import { NextFunction, Request, Response } from "express";

import { WeatherPresenter } from "../presenters";
import { weatherService } from "../services";
import { IBody } from "../types";

class WeatherJsonController {
  public async getWeatherJson(req: Request, res: Response, next: NextFunction) {
    const { city, latitude, longitude } = req.body as IBody;

    if (city) {
      try {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForCity({ city });

        const weatherFiveDayPresenter = weatherFiveDay.map((value) =>
          WeatherPresenter.weatherFiveDayResponse(value),
        );
        const weatherTodayPresenter =
          WeatherPresenter.weatherTodayResponse(weatherToday);

        res.status(200).json({
          data: weatherTodayPresenter,
          weatherFiveDayPresenter,
        });
      } catch (e) {
        next(e);
      }
    }
    if (latitude && longitude) {
      const { weatherToday, weatherFiveDay } =
        await weatherService.getWeatherForLatLng({ latitude, longitude });

      const weatherFiveDayPresenter = weatherFiveDay.map((value) =>
        WeatherPresenter.weatherFiveDayResponse(value),
      );
      const weatherTodayPresenter =
        WeatherPresenter.weatherTodayResponse(weatherToday);

      res.status(200).json({
        data: weatherTodayPresenter,
        weatherFiveDayPresenter,
      });
    }
  }
}

export const weatherJsonController = new WeatherJsonController();
