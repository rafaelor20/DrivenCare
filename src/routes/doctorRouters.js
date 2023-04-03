import { Router } from "express";

import { doctorValidation } from "../middlewares/doctorSignUp.middleware.js";
import { doctorSignUp } from "../controllers/doctorSignUp.controller.js";

import {authenticateDoctor} from "../middlewares/doctorSignIn.middleware.js";
import { loginDoctor } from "../controllers/doctorSignIn.controller.js";
import { getDoctorAppointments } from  "../controllers/getDoctorAppointments.controller.js";
import { cancelAppointment} from "../controllers/doctorCancelAppointment.controller.js";



const doctorRoutes = Router();

doctorRoutes.post("/signup-doctor", doctorValidation, doctorSignUp)
doctorRoutes.post("/signin-doctor", authenticateDoctor, loginDoctor)
doctorRoutes.get("/doctor-appointments", getDoctorAppointments)
doctorRoutes.get("/cancel-appointment/:id", cancelAppointment)



export default doctorRoutes;