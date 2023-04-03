import bcrypt from 'bcrypt';
import { db } from '../database/db.js';


export async function doctorSignUp(req, res) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const queryText = 'INSERT INTO doctors(name, email, phone, password, specialty) VALUES($1, $2, $3, $4, $5)';
  const values = [req.body.name, req.body.email, req.body.phone, hashedPassword, req.body.specialty];
  try {
    await db.query(queryText, values);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
