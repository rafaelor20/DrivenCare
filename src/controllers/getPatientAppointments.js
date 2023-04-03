import { db } from "../database/db.js";

export async function getAppointments(req, res) {
    const patientToken = req.headers.authorization.split(" ")[1];

    try {
        // Query the database to find the patient with the given token
        const queryPatient = 'SELECT * FROM patient_sessions WHERE token = $1';
        const valuesPatient = [patientToken];
        const resultPatient = await db.query(queryPatient, valuesPatient);

        if (resultPatient.rowCount === 0) {
            return res.status(401).send({ message: 'Invalid token' });
        }

        const patient = resultPatient.rows[0];

        // Query the database to find the appointments of the given patient
        const queryAppointments = `SELECT appointments.id, doctors.name as doctor_name, available_times.date, available_times.start_time, available_times.end_time, appointments.confirmed, appointments.finished 
    FROM appointments 
    JOIN doctors ON doctors.id = appointments.doctor_id
    JOIN available_times ON available_times.id = appointments.time
    WHERE appointments.patient_id = $1`;
        const valuesAppointments = [patient.id];
        const resultAppointments = await db.query(queryAppointments, valuesAppointments);

        res.status(200).send({ appointments: resultAppointments.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
}
