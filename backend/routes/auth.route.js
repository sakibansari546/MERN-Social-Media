import { Router } from "express";
import { checkAuth, deleteUser, editProfile, followOrUnfollow, forgotPassword, getUserProfile, logout, resetPassword, signin, signup, varifyEmail } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.get('/check-auth', verifyToken, checkAuth);
router.get('/get-user-profile/:userId', getUserProfile);

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.post('/verify-email', varifyEmail)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.patch('/edit-profile', verifyToken, upload.single('profileImage'), editProfile);

router.patch('/follow-unfollow/:userId', verifyToken, followOrUnfollow);

router.delete('/delete', deleteUser)

export default router;