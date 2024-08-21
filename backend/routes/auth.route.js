import { Router } from "express";
import { checkAuth, deleteUser, forgotPassword, logout, resetPassword, signin, signup, varifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.post('/verify-email', varifyEmail)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)


router.delete('/delete', deleteUser)

export default router;