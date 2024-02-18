import { Router } from "express";

import { weatherJsonController } from "../controllers";

const router = Router();

router.post("", weatherJsonController.getWeatherJson);

export const weatherJsonRouter = router;
