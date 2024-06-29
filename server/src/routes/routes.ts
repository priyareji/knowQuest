import { Application } from "express";
import {authRoutes} from "./auth/auth.route";
import {adminRoute} from "./admin/admin.route"


const routesConfig = (app:Application) =>{
    app.use('/api/v1/auth',authRoutes())
    app.use('/api/v1/admin',adminRoute())

}
export default routesConfig;