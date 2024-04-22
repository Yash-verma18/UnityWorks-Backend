import express from "express";
import { refreshController } from "../middleware/authentication";
const router = express.Router();

router.post("/refresh", refreshController);

export default router;
