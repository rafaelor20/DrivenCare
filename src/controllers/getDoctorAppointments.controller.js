import { db } from "../database/db.js";

export async function getDoctorAppointments(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Query the database to find the doctor with the given token
    const query = 'SELECT * FROM doctor_sessions WHERE token = $1';
    const values = [token];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    const doctorSession = result.rows[0];

    // Query the database to get the doctor's appointments
    const appointmentQuery = `
      SELECT appointments.id, appointments.time, appointments.confirmed, appointments.finished,
        available_times.date, available_times.start_time, available_times.end_time,
        patients.name, patients.email
      FROM appointments
      JOIN available_times ON appointments.time = available_times.id
      JOIN patients ON appointments.patient_id = patients.id
      WHERE appointments.doctor_id = $1
      ORDER BY available_times.date, available_times.start_time
    `;
    const appointmentValues = [doctorSession.doctor_id];
    const appointmentResult = await db.query(appointmentQuery, appointmentValues);

    // Return the list of appointments
    res.status(200).send({ appointments: appointmentResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
