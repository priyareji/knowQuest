import {Request,Response} from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService =new AuthService();
    
    async registerAdmin(req: Request, res: Response): Promise<void> {
        try {
        //   if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Access denied. Only admins can create an admin.' });
        //   }
          const admin = await this.authService.register({ ...req.body, role: 'admin' });
          res.status(201).json(admin);
        } catch (error) {
          res.status(400).json({ message:"error.message" });
        }
      }

      async registerInstructor(req:Request,res:Response):Promise<void>{
        try{
            const instructor=await this.authService.register({...req.body,role:'instructor'});
            res.status(201).json(instructor);
        }catch(error){
          const errorMessage = (error as Error).message || 'An unknown error occurred';
          res.status(400).json({ message: errorMessage });
        }
      }
      async registerStudent(req:Request,res:Response):Promise<void>{
        try{
            const student=await this.authService.register({...req.body,role:'student'});
            res.status(201).json(student);
        }
        catch(error){
          const errorMessage = (error as Error).message || 'An unknown error occurred';
          res.status(400).json({ message: errorMessage });
        }
      }

      async login(req:Request,res:Response):Promise<void>{
        try{
            const {token,user}=await this.authService.login(req.body.email,req.body.password);
            res.status(200).json({token,user})
        }
        catch(error ){
          const errorMessage = (error as Error).message || 'An unknown error occurred';
          res.status(400).json({ message: errorMessage });
        }
      }
}