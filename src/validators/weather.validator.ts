import joi, { ObjectSchema } from "joi";

export class WeatherValidator {
  private static city = joi.string().min(2).max(30).trim();
  private static latitude = joi.string().min(2).max(30).trim();
  private static longitude = joi.string().min(2).max(30).trim();

  public static getWeatherCity: ObjectSchema = joi.object({
    city: this.city.required(),
  });

  public static getWeatherCoordinate: ObjectSchema = joi.object({
    latitude: this.latitude.required(),
    longitude: this.longitude.required(),
  });
}
