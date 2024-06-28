import { Application } from "express";
import {authRoutes} from "./auth/auth.route";


const routesConfig = (app:Application) =>{
    app.use('/api/v1/auth',authRoutes())

}
export default routesConfig;