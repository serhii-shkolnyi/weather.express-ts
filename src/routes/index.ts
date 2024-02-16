import { Router } from "express";

import { weatherRouter } from "./weather.router";

const router = Router();

router.use("/weather", weatherRouter);

export const apiRouter = router;
