import express from "express";
import { mailHotel } from "./api/email";

const router = express.Router();
router.post("/mailHotel",mailHotel);
export default router;