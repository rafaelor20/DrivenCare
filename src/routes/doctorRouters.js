import { Router } from "express";

import { doctorValidation } from "../middlewares/doctorSignUp.middleware.js";
import { doctorSignUp } from "../controllers/doctorSignUp.controller.js";

import {authenticateDoctor} from "../middlewares/doctorSignIn.middleware.js";
import { loginDoctor } from "../controllers/doctorSignIn.controller.js";

import { getDoctorsByName } from "../controllers/searchDoctorByName.controller.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup-doctor", doctorValidation, doctorSignUp)
doctorRoutes.post("/signin-doctor", authenticateDoctor, loginDoctor)
doctorRoutes.get('/doctors-by-name', getDoctorsByName);

export default doctorRoutes;