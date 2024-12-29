import express from "express";
import { googlelogin, googleUser } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.validate";

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

export default router;