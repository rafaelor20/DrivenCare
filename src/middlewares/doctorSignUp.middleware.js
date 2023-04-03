import { doctorSchema } from "../schemas/doctorSchema.js";

export async function doctorValidation (req, res, next) {
  
  const { error } = doctorSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }
  next();
};


