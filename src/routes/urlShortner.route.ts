import express from "express";
import path from "path"
import { validateToken } from "../middlewares/auth.validate";
const router = express.Router()

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../utils/', 'dashboard.html'));
  });
router.post("/shorten", )
export default router