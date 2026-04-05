import express from "express";
import auth from "../../middleware/auth.js";
import { summary, category, recent,monthly,weekly } from "./dashboardcontroller.js";

const router = express.Router();

router.get("/summary", auth, summary);
router.get("/category", auth, category);
router.get("/recent", auth, recent);
router.get("/monthly", auth, monthly);
router.get("/weekly", auth, weekly);

export default router;