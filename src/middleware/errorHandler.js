import httpStatus from "http-status";
import { readFile } from "fs/promises";

export async function notFound(req, res, next) {
  const error = new Error(`Route not found`);
  error.code = 404;
  // const htmlContent = await readFile("./src/templates/code_404.html", "utf8");
  // return res.type("html").send(htmlContent);

  next(error);
}

export function errorHandler(err, req, res, next) {
  console.error(err.message);

  res.status(err.code || 500).json({
    code: err.code || 500,
    message: err.message || httpStatus["500_MESSAGE"],
  });
}
