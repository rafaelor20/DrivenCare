import { Router } from "express";

import { getAvailableTimesByDoctorId } from "../controllers/getAvailableTimes.controller";


const appointmentRoutes = Router();

appointmentRoutes.get("/getAvailableTimes", getAvailableTimesByDoctorId)

export default appointmentRoutes;