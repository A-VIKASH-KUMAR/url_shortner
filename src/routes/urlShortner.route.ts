import express from "express";
import path from "path"
import { validateToken } from "../middlewares/auth.validate";
import { createShortUrl, getUserUrls, getLongUrl } from "../controllers/urlShorten.controller";
const router = express.Router()

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../utils/', 'dashboard.html'));
  });
router.post("/shorten",validateToken ,createShortUrl)
export default router

router.get("/user-urls", validateToken, getUserUrls)

router.get("/:alias", getLongUrl)