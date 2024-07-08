import { Router } from "express";
import { AuthController } from "../../controller/auth.controller";
import { AuthService } from "../../services/auth.service";



export const authRoutes = () => {
    const authService = new AuthService();
    const authController = new AuthController(authService)
    const router = Router();
    router.post('/login',(req, res, next) => authController.loginUser(req, res, next))
    // router.post('/refreshToken', refreshAccessToken)
    return router
}
