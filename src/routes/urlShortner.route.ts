import express from "express";
import path from "path"
import { validateToken } from "../middlewares/auth.validate";
import { createShortUrl, getUserUrls, getLongUrl } from "../controllers/urlShorten.controller";
import { getAnalytics } from "../controllers/analytics.controller";
const router = express.Router()

router.get('/dashboard', (req, res) => {
  const dashboardPath = path.join(process.cwd(), 'src/utils/dashboard.html');
  res.sendFile(dashboardPath);
});
router.post("/shorten",validateToken ,createShortUrl)

router.get("/user-urls", validateToken, getUserUrls)

router.get("/:alias", getLongUrl)

router.get("/analytics/:alias", getAnalytics)

export default router
