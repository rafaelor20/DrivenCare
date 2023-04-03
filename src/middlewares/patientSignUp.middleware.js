import { patientSchema } from "../schemas/patientSchema.js";

export async function  patientValidation (req, res, next) {
  
  const { error } = patientSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }
  next();
};

