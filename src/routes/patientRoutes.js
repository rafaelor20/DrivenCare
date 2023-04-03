import { Router } from "express";
import { patientValidation } from "../middlewares/patientSignUp.middleware.js";
import { patientSignup } from "../controllers/patientSignUp.controller.js";
import { authenticatePatient } from "../middlewares/patientSignIn.middleware.js";
import { loginPatient } from "../controllers/patientSignIn.controller.js";
import { getAppointments } from "../controllers/getPatientAppointments.js";

import { getDoctorsByName } from "../controllers/searchDoctorByName.controller.js";
import { getDoctorsBySpecialty } from "../controllers/searchDoctorBySpecialty.controller.js";
import { getDoctorsByAddress } from "../controllers/searchDoctorByAdress.controller.js";

const patientRoutes = Router();

patientRoutes.post("/signup-patient", patientValidation, patientSignup)
patientRoutes.post("/signin-patient", authenticatePatient, loginPatient)
patientRoutes.get("/getPatientAppointments", getAppointments)


patientRoutes.get('/doctors-by-name', getDoctorsByName);
patientRoutes.get('/doctors-by-specialty', getDoctorsBySpecialty);
patientRoutes.get('/doctors-by-adress', getDoctorsByAddress);

export default patientRoutes;