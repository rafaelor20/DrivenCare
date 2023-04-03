import joi from "joi"

export const appointmentSchema = joi.object ({
    doctorId : joi.number.required(),
    pacientId : joi.number.required(),
    date: joi.date().required(),
    startTime: joi.number().less(23).required(),
    endTime: joi.number().less(24).required()
})