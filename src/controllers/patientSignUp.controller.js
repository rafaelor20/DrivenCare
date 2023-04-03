import { db } from "../database/db.js";
import bcrypt from "bcrypt";

export async function patientSignup(req, res) {
    try {
        const { name, email, phone, password, adress } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newPatient = await db.query(
            'INSERT INTO patients (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone, hashedPassword]
        );
        res.status(201).json({ message: 'Patient signup successful', data: newPatient.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

