import { db } from "../database/db.js";

export async function registerAppointment(req, res) {
  const { doctorId, timeId } = req.body;
  const token = req.headers.authorization;

  try {
    // Query the database to find the patient with the given token
    const query = 'SELECT * FROM patient_sessions WHERE token = $1';
    const values = [token];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const patient = result.rows[0];

    // Check if the doctor exists
    const doctorQuery = 'SELECT * FROM doctors WHERE id = $1';
    const doctorValues = [doctorId];
    const doctorResult = await db.query(doctorQuery, doctorValues);

    if (doctorResult.rowCount === 0) {
      return res.status(404).send({ message: 'Doctor not found' });
    }

    // Check if the time slot is available
    const timeQuery = 'SELECT * FROM available_times WHERE id = $1 AND available = true';
    const timeValues = [timeId];
    const timeResult = await db.query(timeQuery, timeValues);

    if (timeResult.rowCount === 0) {
      return res.status(409).send({ message: 'Time slot not available' });
    }

    const timeSlot = timeResult.rows[0];

    // Create a new appointment
    const appointmentQuery = 'INSERT INTO appointments (doctor_id, patient_id, time) VALUES ($1, $2, $3)';
    const appointmentValues = [doctorId, patient.id, timeId];
    await db.query(appointmentQuery, appointmentValues);

    // Update the available times table to mark the time slot as unavailable
    const updateQuery = 'UPDATE available_times SET available = false WHERE id = $1';
    const updateValues = [timeId];
    await db.query(updateQuery, updateValues);

    // Return the appointment object
    const appointment = {
      id: result.rows[0].id,
      doctor_id: doctorId,
      patient_id: patient.id,
      time: timeSlot.id,
      confirmed: false,
      finished: false
    };
    res.status(200).json({ appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
