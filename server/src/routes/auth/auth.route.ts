import { Router } from "express";
import { loginUser } from "../../controller/auth.controller";



export const authRoutes = () => {
    const router = Router();
    router.post('/login',loginUser)
    return router
}
