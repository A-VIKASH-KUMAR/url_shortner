import express from "express";
import { googlelogin, googleUser } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.validate";
import path from "path"
const router = express.Router();
// router.post("/register", validateRegister, register);
// router.post("/login", validateLogin, login);

/**
 * Route for initiating Google login.
 * @name GET /api/auth/google
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} handler - Controller function for initiating Google login.
 */
router.get("/google", googlelogin);

/**
 * Route for handling Google user data after authentication.
 * @name POST /api/auth/google-user
 * @function
 * @memberof Router
 * @param {string} path - The route path.
 * @param {Function} handler - Controller function for handling Google user data.
 */
router.get("/google-redirect", googleUser)

router.get('/login', (req, res) => {
    const loginPath = path.join(process.cwd(), 'src/utils/login.html');
    res.sendFile(loginPath);
  });

router.get('/logout', (req, res) => {
    res.redirect('/login');
  });

export default router;