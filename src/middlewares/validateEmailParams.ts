// src/utils/validateEmailParams.ts
import { Request, Response, NextFunction } from "express";

export const validateEmailParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { mailId, subject, message } = req.body;

  if (!mailId || !subject || !message) {
    res
      .status(400)
      .json({ message: "mailId, subject, and messages are required" });
  } else {
    next(); // Proceed to the next middleware or route handler if validation is successful
  }
};
