// controllers/patientController.js

import { db } from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function loginPatient(req, res) {
  const email = res.locals.email;
  const password = res.locals.password;

  try {
    // Query the database to find the patient with the given email
    const query = 'SELECT * FROM patients WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const patient = result.rows[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, patient.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Generate a token using uuidv4
    const token = uuidv4();

    // Store the token in the patient_sessions table
    const insertQuery = 'INSERT INTO patient_sessions (patient_id, token) VALUES ($1, $2)';
    const insertValues = [patient.id, token];
    await db.query(insertQuery, insertValues);

    // Return the authenticated patient object with the token
    res.status(200).send({ patient: { ...patient, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
