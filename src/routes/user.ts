import express from "express";
import { Login, Signup } from "../service/user";
import { authenticateAccessToken } from "../middleware/authentication";
const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);

export default router;
