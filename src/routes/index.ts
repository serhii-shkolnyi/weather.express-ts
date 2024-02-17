import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "../utils/swagger.json";
import { weatherRouter } from "./weather.router";

const router = Router();

router.use("/weather", weatherRouter);
router.use("/weather.json", weatherRouter);
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const apiRouter = router;
