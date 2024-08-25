import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/multer.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
const router = Router();

router.post("/create-post", verifyToken, upload.single("postImage"), createPost);
router.get("/get-posts", getPosts);

export default router;