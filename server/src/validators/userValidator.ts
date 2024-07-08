import Joi from 'joi';
export const registerSchema=Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  export const createInstructorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('instructor').default('instructor'),
    phonenumber: Joi.string().optional(),
    course: Joi.string().optional(),
    mode: Joi.string().optional(),
    batch: Joi.string().optional(),
});

export const updateInstructorSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phonenumber: Joi.string(),
    course: Joi.string(),
    mode: Joi.string(),
    batch: Joi.string(),
}).min(1);
export const createStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phonenumber: Joi.string().optional(),
    course: Joi.string().optional(),
    role: Joi.string().valid('student').default('student'),
    mode: Joi.string().optional(),
    batch: Joi.string().optional(),
});

export const updateStudentSchema = Joi.object({
    password: Joi.string().min(6).required(),
    phonenumber: Joi.string().optional(),
    course: Joi.string().optional(),
    role: Joi.string().valid('student').default('student'),
    mode: Joi.string().optional(),
    batch: Joi.string().optional(),
}).min(1);
export const createAdminSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin').default('admin'),
});

export const updateAdminSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
}).min(1);