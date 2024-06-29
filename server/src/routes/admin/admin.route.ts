import { Router } from "express";
import { createAdmin, createInstructor, createStudent } from "../../controller/admin.controller";


export const adminRoute=()=>{
    const router=Router();

router.post('/createAdmin', createAdmin),
router.post('/createInstructor', createInstructor),
router.post('/createStudent', createStudent)
return router
}