import express, { NextFunction, Request, Response } from "express";
import { engine } from "express-handlebars";

import { apiConfig } from "./configs";
import { pathConstant } from "./constants";
import { ApiError } from "./errors";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(pathConstant.staticPath));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", pathConstant.staticPath);

app.use(apiRouter);

// let errorStateRender = "";

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err?.status || 500).json({
      message: err?.message,
      status: err?.status,
    });
  },
);

app.listen(apiConfig.PORT, async () => {
  console.log(`Server has successfully started on PORT ${apiConfig.PORT}`);
});
