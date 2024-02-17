import joi from "joi";

export class WeatherValidator {
  private static city = joi.string().min(2).max(30).trim();
  private static latitude = joi.string().min(2).max(30).trim();
  private static longitude = joi.string().min(2).max(30).trim();
}
