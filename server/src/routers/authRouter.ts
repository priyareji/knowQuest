import  { Request, Response } from 'express';
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/validate';
import { registerSchema,loginSchema } from '../validation/authValidation';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const authController = new AuthController();

router.post('/login', validate(loginSchema), (req, res) => authController.login(req, res));
router.post('/admin/create-admin',  authMiddleware(['admin']), (req:Request, res:Response) => authController.registerAdmin(req, res));
router.post('/admin/create-instructor',  authMiddleware(['admin']), validate(registerSchema), (req:Request, res:Response) => authController.registerInstructor(req, res));
router.post('/admin/create-student',  authMiddleware(['admin']), validate(registerSchema), (req:Request, res:Response) => authController.registerStudent(req, res));

export default router;