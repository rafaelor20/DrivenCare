import joi from "joi"

export const patientSchema = joi.object ({
    name: joi.string().required(),
    password: joi.string().min(8).required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^[0-9]{10,11}$/).required()}
)