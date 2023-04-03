import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import doctorRoutes from "./routes/doctorRouters.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([doctorRoutes, patientRoutes])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));