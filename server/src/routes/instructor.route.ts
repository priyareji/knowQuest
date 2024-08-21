import { Request } from 'express';
import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddlewares";
import { AdminController } from "../controller/admin.controller";
import { AdminService } from "../services/admin.service";
import ApiResponse from "../utils/ApiResponse";
import HttpStatus from "../types/constants/http-statuscode";
import { InstructorController } from "../controller/instructor.controller";
import { upload } from "../middlewares/multer";

import { USER } from "../types/model/IUser.interface";
import { verify } from 'jsonwebtoken';
import multer from 'multer';



export const instructorRoute=()=>{
    const instructorController = new InstructorController()
    //const adminController = new AdminController()
    const uploadd = multer({ dest: 'uploads/' });
    const router=Router();
  
        router.get('/profiledetails',verifyJWT,(req:Request, res, next) => instructorController.getInstructorInfo(req,res,next))
        router.post('/createUnit',verifyJWT,(req,res,next)=>instructorController.createUnit(req,res,next))
        router.get('/getUnitsBySubjectId/:subjectId', (req, res, next) => instructorController.getUnitsBySubjectId(req, res, next));
        router.post('/createChapter',verifyJWT,(req,res,next)=> instructorController.createChapter(req,res,next))
        router.post('/createSection',uploadd.array('files[]'),verifyJWT,(req:Request,res,next)=> instructorController.createSection(req,res,next))
        router.post('/addBook',uploadd.array('files[]'),verifyJWT,(req,res,next)=> instructorController.createBook(req,res,next))
        router.put('/addVideo/:subjectId',verifyJWT,(req,res,next)=> instructorController.createVideo(req, res, next));
        router.get('/getChaptersByUnitId/:unitId',verifyJWT,(req,res,next)=>instructorController.getChaptersByUnitId(req,res,next));
        router.get('/getSectionsByChapterId/:chapterId',verifyJWT,(req,res,next)=>instructorController.getSectionsByChapterId(req,res,next))
        router.post('/createAssignment',verifyJWT, upload,(req,res,next)=>instructorController.createAssignment(req,res,next))
        router.get('/getAssignmentsByInstructorId',verifyJWT,(req:Request, res, next) => instructorController.getAssignmentByInstructorId(req,res,next))
        router.post('/createQuestion',verifyJWT,(req,res,next)=>instructorController.createQuestion(req,res,next))
        router.post('/liveClass',verifyJWT,(req,res,next)=>instructorController.createLiveClass(req,res,next))
        router.put('/change-password',verifyJWT,instructorController.changePassword.bind(instructorController))

        return router
}