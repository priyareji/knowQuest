import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import AppError from '../utils/AppError';
import HttpStatus from '../types/constants/http-statuscode';


export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }
        next();
    };
};