import express from "express";
import mailSesRouter from "./sesMailRoute";
import fileUploadRouter from "./fileUploadRoute";
import mailHotelRouter from "./nodeMailRoute";
import qrCodeRouter from "./qrCodeRoute";
import { validateApiKey } from "../middlewares/validateApiKey";

const router = express.Router();


// Apply API key validation middleware
router.use(validateApiKey); 
// Use routes with explicit paths
router.use( mailHotelRouter);
router.use( mailSesRouter);
router.use( fileUploadRouter);
router.use(qrCodeRouter);
export default router;
