import { Router } from "express";
import { patientValidation } from "../middlewares/patientSignUp.middleware.js";
import { patientSignup } from "../controllers/patientSignUp.controller.js";
import { authenticatePatient } from "../middlewares/patientSignIn.middleware.js";
import { loginPatient } from "../controllers/patientSignIn.controller.js";
import { getAppointments } from "../controllers/getPatientAppointments.js";

const patientRoutes = Router();

patientRoutes.post("/signup-patient", patientValidation, patientSignup)
patientRoutes.post("/signin-patient", authenticatePatient, loginPatient)
patientRoutes.get("/getPatientAppointments", getAppointments)

export default patientRoutes;