import { IUser } from '../interfaces/IUser';
import {UserRepository} from '../repositories/UserRepository';



export class UserService{
    private userRepository = new UserRepository();
    async getAllUsers():Promise<IUser[]>{
        return this.userRepository.findAll();
    }

    async getUserById(id:string){
        // return this.userRepository.findById(id);
    }
    async createUser(user:IUser){}
    
    async updateUser(id:string,user:Partial<IUser>){}
    async deleteUser(id:string){}
}