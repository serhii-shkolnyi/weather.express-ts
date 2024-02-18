import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NextFunction, Request, Response } from "express";

import { weatherService } from "../services";

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
      const body = req.body;
      errorState = "";

      if (body.hasOwnProperty("city")) {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForCity(body);

        const dataToday = dayjs(new Date()).format("MMM DD, hh:mma");
        const temperature = Math.round(weatherToday.main.temp);
        const feelsLike = Math.round(weatherToday.main.feels_like);

        const fiveForecast = weatherFiveDay.filter(
          (value: any) => value.dt_txt.split(" ")[1] === "12:00:00",
        );
        const forecast: any[] = [];
        fiveForecast.forEach((value: any) => {
          const dataForecast = dayjs.unix(value.dt).format("ddd, MMM DD");
          const tempForecast = Math.round(value.main.temp);
          const weather: any[] = [];
          value.weather.forEach((we: any) => {
            const icoForecast = we.icon;
            const descriptionForecast = we.description;
            weather.push({
              icoForecast,
              descriptionForecast,
            });
          });

          forecast.push({
            dataForecast,
            tempForecast,
            weather,
          });
        });
        if (errorState === "city not found") {
          console.log("kkkkkkkkkkkkkkkkkkkkkkk");
        }
        res.render("weather-page", {
          dataToday,
          temperature,
          feelsLike,
          weatherToday,
          forecast,
          errorState,
        });
      } else if (body.hasOwnProperty("latitude")) {
        const { weatherToday, weatherFiveDay } =
          await weatherService.getWeatherForLatLng({
            latitude: body.latitude,
            longitude: body.longitude,
          });

        const dataToday = dayjs(new Date()).format("MMM DD, hh:mma");
        const temperature = Math.round(weatherToday.main.temp);
        const feelsLike = Math.round(weatherToday.main.feels_like);

        const fiveForecast = weatherFiveDay.filter(
          (value: any) => value.dt_txt.split(" ")[1] === "12:00:00",
        );
        const forecast: any[] = [];
        fiveForecast.forEach((value: any) => {
          const dataForecast = dayjs.unix(value.dt).format("ddd, MMM DD");
          const tempForecast = Math.round(value.main.temp);
          const weather: any[] = [];
          value.weather.forEach((we: any) => {
            const icoForecast = we.icon;
            const descriptionForecast = we.description;
            weather.push({
              icoForecast,
              descriptionForecast,
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
