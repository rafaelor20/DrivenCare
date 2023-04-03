// controllers/doctorController.js

import { db } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

export async function loginDoctor(req, res) {
  const email = res.locals.email;
  const password = res.locals.password;

  try {
    // Query the database to find the doctor with the given email
    const query = 'SELECT * FROM doctors WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const doctor = result.rows[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Return the authenticated doctor object

    const token = uuidV4();

    const insertQuery = 'INSERT INTO doctor_sessions (doctor_id, token) VALUES ($1, $2)';
    const insertValues = [doctor.id, token];
    await db.query(insertQuery, insertValues);

    // Return the authenticated doctor object with the token
    res.status(200).send({ doctor: { ...doctor, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

}