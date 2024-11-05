import express from "express";
import mailHotelRouter from "./mailHotelRoute";
import mailSesRouter from "./mailSesRoute";
import fileUploadRouter from "./fileUploadRoute";

const router = express.Router();

// Add routes with explicit paths
router.use(mailHotelRouter);
router.use(mailSesRouter);
router.use(fileUploadRouter); // Define as /api/upload

export default router;
