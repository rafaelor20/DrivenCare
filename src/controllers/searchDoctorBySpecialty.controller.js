import { db } from '../database/db.js';

export async function getDoctorsBySpecialty(req, res) {
  const { specialty } = req.query;

  try {
    // Check if the token is present in the headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Query the database to find the patient with the given token
    const query = 'SELECT * FROM patient_sessions WHERE token = $1';
    const values = [token];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).send({ message: 'Unauthorized' });
    }


    // Query the database to find the doctors with the given specialty
    const searchQuery = `SELECT * FROM doctors WHERE specialty ILIKE '%${specialty}%'`;
    const searchResult = await db.query(searchQuery);

    // Return the doctors
    res.status(200).send({ doctors: searchResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
}
