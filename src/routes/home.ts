import express from "express";
const router = express.Router();

export const getServerStatus = async (req: any, res: any) => {
  res.status(200).send({
    Status: "Up",
    Service: "basic api",
    Environment: process.env.ENV as string,
    Timestamp: Date.now(),
  });
};

router.get("", getServerStatus);

export default router;
