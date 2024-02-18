import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";

import { commonMiddleware } from "../middleware";
import * as swaggerDocument from "../utils/swagger.json";
import { weatherRouter } from "./weather.router";
import { weatherJsonRouter } from "./weather-json.router";

const router = Router();

router.use("/weather", weatherRouter);
router.use(
  "/weather.json",
  commonMiddleware.ifBody,
  commonMiddleware.isBodyValid,
  weatherJsonRouter,
);
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const apiRouter = router;
