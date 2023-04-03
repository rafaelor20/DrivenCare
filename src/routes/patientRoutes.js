import { Router } from "express";
import { patientValidation } from "../middlewares/patientSignUp.middleware.js";
import { patientSignup } from "../controllers/patientSignUp.controller.js";

const patientRoutes = Router();

patientRoutes.post("/signup-patient", patientValidation, patientSignup)
//patientRoutes.post("/signin-patient", )

export default patientRoutes;