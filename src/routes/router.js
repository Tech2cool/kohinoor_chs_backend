import { Router } from "express";
import userRouter from "./user/userRouter.js";
import flatRouter from "./flat/flatRouter.js";
import chronologyRouter from "./chronology/chronologyRouter.js";

const router = Router();

router.get("/ping", async (req, res) => {
  res.json({ code: 200, message: "ok" });
});

router.get("/", async (req, res) => {
  // const htmlContent = await readFile(
  //   "./src/templates/api_welcome_page.html",
  //   "utf8"
  // );
  return res.json({ code: 200, message: "Hello Shree Vasundhara CHS" });

  // return res.type("html").send(htmlContent);
});
router.use(userRouter);
router.use(flatRouter);
router.use(chronologyRouter);

export default router;
