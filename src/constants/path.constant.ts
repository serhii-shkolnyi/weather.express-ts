import path from "node:path";

export const pathConstant = {
  staticPath: path.join(process.cwd(), "src", "static"),
  cityJsonPath: path.join(process.cwd(), "ua.json"),
};
