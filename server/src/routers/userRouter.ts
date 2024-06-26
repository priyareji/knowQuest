import {Router} from 'express';
import {validate} from '../middlewares/validate';
import { createUserSchema,updateUserSchema } from '../validation/userValidation';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/auth';

const router=Router();
const authController = new AuthController();

// router.post('/login', (req, res) => authController.login(req, res));
// router.post('/admin/create-admin', authMiddleware, (req, res) => authController.registerAdmin(req, res));
// router.post('/admin/create-instructor', authMiddleware, (req, res) => authController.registerInstructor(req, res));
// router.post('/admin/create-student', authMiddleware, (req, res) => authController.registerStudent(req, res));
export default router;