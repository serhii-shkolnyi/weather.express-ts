import { Router } from "express";

import { weatherController } from "../controllers";

const router = Router();

router.get("", weatherController.renderWeatherPage);
router.post("", weatherController.getWeather);
export const weatherRouter = router;
