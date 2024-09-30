import express from "express";
import { mailHotel } from "./api/email";
import {  sendEmailUsingSes } from "./api/amazonSes";

const router = express.Router();
router.post("/mailHotel", (req, res) => {
  mailHotel(req.query);
  res.status(200).send({"message":'Email sent Successfully'});
});

router.get("/mail-using-amazon", (req, res) => {
  sendEmailUsingSes(req.query);
  res.status(200).send({"message":'Email sent Successfully'});
});

export default router;

