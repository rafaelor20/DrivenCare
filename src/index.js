import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import doctorRoutes from "./routes/doctorRouters.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([doctorRoutes, patientRoutes, appointmentRoutes])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));