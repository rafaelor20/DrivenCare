import joi from "joi"

export const doctorSchema = joi.object ({
    name: joi.string().required(),
    password: joi.string().min(6).required(),
    email: joi.string().email().required(),
    address: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
    specialty: joi.string()
})