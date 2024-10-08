import { Router } from "express";
import { AdminController  } from "../../controller/admin.controller";
import {  verifyJWT } from "../../middlewares/authMiddlewares";
import { validateRequest } from "../../middlewares/validator";
import { createAdminSchema, createInstructorSchema, createStudentSchema, updateInstructorSchema, updateStudentSchema } from "../../validators/userValidator";
import { AuthController } from "../../controller/auth.controller";
import { AuthService } from "../../services/auth.service";


export const adminRoute=()=>{
    const authService = new AuthService();
    const router=Router();
const adminController = new AdminController()
const authController = new AuthController(authService)

router.post('/createAdmin',(req,res,next)=> adminController.createAdmin(req,res)),
router.post('/createInstructor',verifyJWT, (req,res,next)=>adminController.createInstructor(req,res)),
router.post('/createStudent',verifyJWT,(req,res,next)=>adminController.createStudent(req,res)),
router.post('/reset-password/instructor',(req,res,next)=>adminController.instructoResetPassword(req,res)),
router.post('/reset-password/student',(req,res,next)=>adminController.studentResetPassword(req,res)),
router.get('/getAllInstructors',verifyJWT, (req,res,next)=>adminController.getAllInstructor(req,res,next)),
router.get('/getAllStudents',verifyJWT,(req,res,next)=>adminController.getAllStudent(req,res,next)),
router.put('/edit-instructor/:id',verifyJWT, (req,res,next)=>adminController.editInstructorsById(req,res)),
router.put('/edit-student/:id',verifyJWT, (req,res,next)=>adminController.editStudentsById(req,res)),
router.get('/get-instructor/:id',verifyJWT, (req,res,next)=>adminController.getInstructorId(req,res)),
router.get('/get-student/:id',verifyJWT, (req,res,next)=>adminController.getStudentId(req,res)),
router.post('/createmode',(req,res,next)=>adminController.createMode(req,res,next));
router.post('/modes', adminController.createMode);
router.get('/modes', adminController.getAllModes);
router.get('/modes/:id', adminController.getModeById);
router.delete('/modes/:id', adminController.deleteMode);
router.post('/batches', (req,res,next)=>adminController.createBatch(req,res,next));
router.get('/batches', (req,res,next)=>adminController.getAllBatches(req,res,next));
router.delete('/batches/:id', (req,res,next)=>adminController.deleteBatch(req,res,next));
router.put('/batches/:batchId', verifyJWT, (req, res, next) => adminController.updateBatch(req, res, next));
router.get('/batches/:batchId', verifyJWT, (req, res, next) => adminController.getBatchById(req, res, next));
router.post('/course', (req,res,next)=>adminController.createCourse(req,res,next));
router.get('/course', (req,res,next)=>adminController.getCourses(req,res,next));
router.get('/course/:courseId', verifyJWT, (req, res, next) => adminController.getCourseById(req, res, next));
router.put('/course/:courseId', verifyJWT, (req, res, next) => adminController.updateCourse(req, res, next));
router.delete('/course/:id', (req,res,next)=>adminController.deleteCourse(req,res,next));
router.post('/subject', (req,res,next)=>adminController.createSubject(req,res,next));
router.get('/subject', (req,res,next)=>adminController.getSubjects(req,res,next));
router.put('/subject/:subjectId', verifyJWT, (req, res, next) => adminController.updateSubject(req, res, next));
router.get('/subject/:id', (req,res,next)=>adminController.getSubject(req,res,next));
router.delete('/subject/:id',verifyJWT, (req,res,next)=>adminController.deleteSubject(req,res,next));
router.patch('/subject/:subjectId/status',verifyJWT,(req,res,next)=>adminController.updateSubjectStatus(req,res,next))
router.put('/blockInstructor/:id',verifyJWT,(req,res,next)=>adminController.blockInstructor(req,res,next))
router.put('/blockStudent/:id',verifyJWT,(req,res,next)=>adminController.blockStudent(req,res,next))
router.put('/unblockInstructor/:id',verifyJWT,(req,res,next)=>adminController.unblockInstructor(req,res,next))
router.put('/unblockStudent/:id',verifyJWT,(req,res,next)=>adminController.unblockStudent(req,res,next))
router.post('/logout',authController.logoutadmin)

return router
}