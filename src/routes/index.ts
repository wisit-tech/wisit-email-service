import express from "express";
import mailSesRouter from "./sesMailRoute";
import fileUploadRouter from "./fileUploadRoute";
import mailHotelRouter from "./nodeMailRoute";

const router = express.Router();

// Use routes with explicit paths
router.use( mailHotelRouter);
router.use( mailSesRouter);
router.use( fileUploadRouter);

export default router;
