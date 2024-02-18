import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextFunction, Request, Response } from "express";

import { weatherService } from "../services";
import { IBody, IForecastData, Weather } from "../types";

dayjs.extend(utc);

let errorState: string = "";
class WeatherController {
  public async renderWeatherPage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dataToday = dayjs(new Date()).format("MMM DD, hh:mma");
      return res.render("weather-page", { dataToday, errorState });
    } catch (e) {
      next(e);
    }
  }

  public async getWeather(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { city, latitude, longitude } = req.body as IBody;
      errorState = "";

      if (city) {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForCity({ city });

        const dataToday = dayjs(new Date()).format("MMM DD, hh:mma");
        const temperature = Math.round(weatherToday.main.temp);
        const feelsLike = Math.round(weatherToday.main.feels_like);

        const fiveForecast = weatherFiveDay.filter(
          (value) => value.dt_txt.split(" ")[1] === "12:00:00",
        );
        const forecast: IForecastData[] = [];

        fiveForecast.forEach((value) => {
          const dataForecast = dayjs.unix(value.dt).format("ddd, MMM DD");
          const tempForecast = Math.round(value.main.temp);
          const weather: Partial<Weather>[] = [];
          value.weather.forEach((we) => {
            const icon = we.icon;
            const description = we.description;
            weather.push({
              icon,
              description,
            });
          });

          forecast.push({
            dataForecast,
            tempForecast,
            weather,
          });
        });
        // if (errorState === "city not found") {
        //   console.log("kkkkkkkkkkkkkkkkkkkkkkk");
        // }
        res.render("weather-page", {
          dataToday,
          temperature,
          feelsLike,
          weatherToday,
          forecast,
          errorState,
        });
      }
      if (latitude && longitude) {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForLatLng({
            latitude,
            longitude,
          });

        const dataToday = dayjs(new Date()).format("MMM DD, hh:mma");
        const temperature = Math.round(weatherToday.main.temp);
        const feelsLike = Math.round(weatherToday.main.feels_like);

        const fiveForecast = weatherFiveDay.filter(
          (value) => value.dt_txt.split(" ")[1] === "12:00:00",
        );
        const forecast: IForecastData[] = [];

        fiveForecast.forEach((value) => {
          const dataForecast = dayjs.unix(value.dt).format("ddd, MMM DD");
          const tempForecast = Math.round(value.main.temp);
          const weather: Partial<Weather>[] = [];
          value.weather.forEach((we) => {
            const icon = we.icon;
            const description = we.description;
            weather.push({
              icon,
              description,
            });
          });

          forecast.push({
            dataForecast,
            tempForecast,
            weather,
          });
        });

        res.render("weather-page", {
          dataToday,
          temperature,
          feelsLike,
          weatherToday,
          forecast,
          errorState,
        });
      }
    } catch (e) {
      errorState = e.message;
      next(e);
    }

    if (errorState.length > 0) {
      res.redirect("/weather");
    }
  }
}

export const weatherController = new WeatherController();
