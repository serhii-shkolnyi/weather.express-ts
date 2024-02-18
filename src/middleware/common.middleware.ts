import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors";
import { IBody } from "../types";
import { WeatherValidator } from "../validators";

class CommonMiddleware {
  public ifBody(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IBody;

      if (body.city) {
        req.res.locals.validator = WeatherValidator.getWeatherCity;
      }
      if (body.latitude && body.longitude) {
        req.res.locals.validator = WeatherValidator.getWeatherCoordinate;
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public isBodyValid(req: Request, res: Response, next: NextFunction) {
    const validator: ObjectSchema = req.res.locals.validator as ObjectSchema;

    try {
      const { value, error } = validator.validate(req.body);
      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
