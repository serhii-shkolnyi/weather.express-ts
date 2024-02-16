import fs from "node:fs/promises";

import { NextFunction, Request, Response } from "express";

import { pathConstant } from "../constants";
import { ICity } from "../types";

class WeatherController {
  public async renderWeatherPage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cityJSON = await fs.readFile(pathConstant.cityJsonPath, {
        encoding: "utf-8",
      });
      const cityArray = JSON.parse(cityJSON) as ICity[];

      return res.render("weather-page", { cityArray });
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
      console.log(body);

      return res.render("weather-page");
    } catch (e) {
      next(e);
    }
  }
}

export const weatherController = new WeatherController();
