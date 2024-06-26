import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../interfaces/IUser';
import { adminRepository } from '../repositories/AdminRepository';

export class AuthService{
    private userRepository=new UserRepository();
    private adminRepository=new adminRepository();
    private saltRounds =10;
    private jwtSecret=process.env.JWT_SECRET || 'your_jwt_secret';

    async register(userData:IUser):Promise<IUser>{
        const {name,email,password,phonenumber,role,isAdmin,course,batch,subject,mode}=userData
        //check if user already exits
        const existingUser=await this.userRepository.findUserByEmail(email);
        if(existingUser){
            throw new Error('User already exists');
        }
        //Hash PAssword
        const hashedPassword=await bcrypt.hash(password,this.saltRounds);

        //Handle different roles 
       let newUser;

       switch(role){
        case 'admin':
          newUser=await this.adminRepository.createAdmin({...userData,password:hashedPassword})
          break;
          case 'instructor':
            newUser=await this.adminRepository.createInstructor({...userData,password:hashedPassword})
            break;
          case 'student':
            newUser=await this.adminRepository.createStudent({...userData,password:hashedPassword})
            break;
            default:
              throw new Error('Invalid role')
       }

return newUser

    }
    async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
        // Find user by email
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
          throw new Error('Invalid email or password');
        }
    
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
    
        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, this.jwtSecret, { expiresIn: '1h' });
        return { token, user };
      }
    
}