import express, { NextFunction, Request, Response } from "express";

const router = express.Router();
router.get("", async (request: Request, response: Response, next: NextFunction) => {
  try {      
  }
  catch (err: any) {
    next(err);
  }
});

export default router;