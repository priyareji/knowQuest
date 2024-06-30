import { Application } from "express";
import {authRoutes} from "./auth/auth.route";
import {adminRoute} from "./admin/admin.route";
import {instructorRoute} from "./instructor.route";
import {studentRoute} from './student.route';


const routesConfig = (app:Application) =>{
    app.use('/api/v1/auth',authRoutes())
    app.use('/api/v1/admin',adminRoute())
    app.use('/api/v1/instructor',instructorRoute())
    app.use('/api/v1/student',studentRoute())

}
export default routesConfig;