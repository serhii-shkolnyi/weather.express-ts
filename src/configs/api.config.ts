import { config } from "dotenv";

config();

export const apiConfig = {
  PORT: process.env.PORT || 5006,

  OPEN_WEATHER: process.env.OPEN_WEATHER,
  API_KEY: process.env.API_KEY,
};
