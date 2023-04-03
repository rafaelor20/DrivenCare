import { db } from "../database/db.js";

export async function cancelAppointment(req, res) {
  const { appointmentId } = req.params.id;
  const token = req.headers.authorization.split(' ')[1];

  // Find the doctor associated with the token
  const doctorSessionQuery = 'SELECT * FROM doctor_sessions WHERE token = $1';
  const doctorSessionValues = [token];
  const doctorSessionResult = await db.query(doctorSessionQuery, doctorSessionValues);

  if (doctorSessionResult.rowCount === 0) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const doctorId = doctorSessionResult.rows[0].doctor_id;

  try {
    // Cancel the appointment
    const cancelAppointmentQuery = 'UPDATE appointments SET confirmed = false WHERE id = $1 AND doctor_id = $2';
    const cancelAppointmentValues = [appointmentId, doctorId];
    await db.query(cancelAppointmentQuery, cancelAppointmentValues);

    res.status(200).json({ message: 'Appointment cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
