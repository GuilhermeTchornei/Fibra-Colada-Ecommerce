import * as Joi from "joi";

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    name: Joi.string().required(),
    phone: Joi.string().length(11).required()
});
