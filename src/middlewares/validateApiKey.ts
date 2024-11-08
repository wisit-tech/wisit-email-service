import { Request, Response, NextFunction } from "express";
import { API_KEY } from "../utils/constants";

// Middleware function to validate API key
export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];
  const expectedApiKey = API_KEY;

  if (apiKey === expectedApiKey) {
    next(); // API key is correct, proceed to the next handler
  } else {
    res.status(401).json({ message: "Unauthorized access: Invalid API key" });
  }
};
