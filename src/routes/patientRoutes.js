import { Router } from "express";
import { patientValidation } from "../middlewares/patientSignUp.middleware.js";
import { patientSignup } from "../controllers/patientSignUp.controller.js";
import { authenticatePatient } from "../middlewares/patientSignIn.middleware.js";
import { loginPatient } from "../controllers/patientSignIn.controller.js";

const patientRoutes = Router();

patientRoutes.post("/signup-patient", patientValidation, patientSignup)
patientRoutes.post("/signin-patient", authenticatePatient, loginPatient)

export default patientRoutes;