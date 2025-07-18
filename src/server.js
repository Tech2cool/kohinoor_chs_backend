import express from "express";
import cors from "cors";
import "dotenv/config";
import config from "./config/config.js";
import router from "./routes/router.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import connectDatabase from "./config/database.js";
connectDatabase();

const app = express();
// app.use(hostnameCheck);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.set("view engine", "ejs");

app.use(cors());
app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => console.log("listening on port " + config.PORT));

export default app;
