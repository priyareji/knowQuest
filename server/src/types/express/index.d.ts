import { AdminDocument } from '../../models/Admin';
import { InstructorDocument } from '../../models/Instructor';
import { StudentDocument } from '../../models/Student';
import { USER } from '../model/IUser.interface'
//import { Types } from 'mongoose';

declare global {
    namespace Express {
      interface Request {
        user?: USER;
      }
    }
  }