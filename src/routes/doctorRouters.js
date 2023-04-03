import { Router } from "express";

import { doctorValidation } from "../middlewares/doctorSignUp.middleware.js";
import { doctorSignUp } from "../controllers/doctorSignUp.controller.js";

import {authenticateDoctor} from "../middlewares/doctorSignIn.middleware.js";
import { loginDoctor } from "../controllers/doctorSignIn.controller.js";

import { getDoctorsByName } from "../controllers/searchDoctorByName.controller.js";
import { getDoctorsBySpecialty } from "../controllers/searchDoctorBySpecialty.controller.js";
import { getDoctorsByAddress } from "../controllers/searchDoctorByAdress.controller.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup-doctor", doctorValidation, doctorSignUp)
doctorRoutes.post("/signin-doctor", authenticateDoctor, loginDoctor)
doctorRoutes.get('/doctors-by-name', getDoctorsByName);
doctorRoutes.get('/doctors-by-specialty', getDoctorsBySpecialty);
doctorRoutes.get('/doctors-by-adress', getDoctorsByAddress);


export default doctorRoutes;