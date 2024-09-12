import express from "express";
import { mailHotel } from "./api/email";

const router = express.Router();
router.post("/mailHotel", (req, res) => {
  mailHotel(req.query);
  res.status(200).send({"message":'Email sent Successfully'});
});
export default router;

