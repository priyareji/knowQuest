import { Router } from "express";
import { createAdmin, createInstructor, createStudent, editInstructorsById, editStudentsById, getAllInstructor,getAllStudent, getInstructorId, getStudentId } from "../../controller/admin.controller";


export const adminRoute=()=>{
    const router=Router();

router.post('/createAdmin', createAdmin),
router.post('/createInstructor', createInstructor),
router.post('/createStudent', createStudent),
router.get('/getAllInstructors', getAllInstructor),
router.get('/getAllStudents', getAllStudent),
router.put('/edit-instructor/:id', editInstructorsById),
router.put('/edit-student/:id', editStudentsById),
router.get('/get-instructor/:id', getInstructorId),
router.get('/get-student/:id', getStudentId)


return router
}