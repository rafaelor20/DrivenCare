import { db } from "../database/db.js";

export async function getAvailableTimesByDoctorId(req, res) {
  const { doctorId } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Check if the patient is authenticated
    const patientQuery = 'SELECT * FROM patient_sessions WHERE token = $1';
    const patientValues = [token];
    const patientResult = await db.query(patientQuery, patientValues);

    if (patientResult.rowCount === 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }


    // Query the database to find the doctor with the given ID
    const doctorQuery = 'SELECT * FROM doctors WHERE id = $1';
    const doctorValues = [doctorId];
    const doctorResult = await db.query(doctorQuery, doctorValues);

    if (doctorResult.rowCount === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    
    // Query the database to find the available times for the doctor with the given ID
    const query = 'SELECT * FROM available_times WHERE doctor_id = $1 AND available = true';
    const values = [doctorId];
    const result = await db.query(query, values);

    // Return the available times
    res.status(200).json({ availableTimes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

