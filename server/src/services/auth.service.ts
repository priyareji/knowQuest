import configKey from "../configs/configkeys";
import { AdminDocument } from "../models/Admin";
import { InstructorDocument } from "../models/Instructor";
import { StudentDocument } from "../models/Student";
import { AdminRepository} from "../repository/adminRepository";

import { findUserByEmail, findUserById } from "../repository/userRepository";
import { AccessTokenAndrefreshTokenInterface } from "../types/app.interfaces";
import HttpStatus from "../types/constants/http-statuscode";
import { IINSTRUCTOR} from "../types/model/IUser.interface";
import AppError from "../utils/AppError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class AuthService{

adminRepository =  new AdminRepository();


async login(email:string,password:string):Promise<{ accessToken:string, refreshToken:string, user:IINSTRUCTOR}>  {
console.log("hello")
// Find user by email
const user = await findUserByEmail(email);
console.log(user,"userr")
if (!user) {
    throw new AppError("User does not exist", HttpStatus.NOT_FOUND);
}

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new  AppError("invalid credentials", HttpStatus.UNAUTHORIZED);
  }

  // accessToken refreshToken
  const accessToken = jwt.sign({ id: user._id, role: user.role }, configKey().ACCESS_TOKEN_SECRET,
  {expiresIn:configKey().ACCESS_TOKEN_EXPIRY});
const refreshToken = jwt.sign({ id: user._id, role: user.role }, configKey().REFRESH_TOKEN_SECRET,
{expiresIn:configKey().REFRESH_TOKEN_EXPIRY});

//   const { accessToken, refreshToken } = await generateAcessTokenAndrefreshToken();
  
  // Get logged in user without password and refreshToken
//   const loggedInUser = await findUserById(user._id);
//   if (!loggedInUser) {
//       throw new AppError("User not found after login", HttpStatus.NOT_FOUND);
//   }
  const userWithoutSensitiveInfo = user.toObject();
  delete userWithoutSensitiveInfo.password;
  delete userWithoutSensitiveInfo.refreshToken;
 return { user:userWithoutSensitiveInfo, accessToken: accessToken, refreshToken: refreshToken }
}


async logoutAdmin(userId: string): Promise<void>   {
  await this.adminRepository.adminfindByIdAndUpdate(userId, {
    $set: {
      refreshAccessToken: undefined
    }
  });
}
}

// export const generateAcessTokenAndrefreshToken = async (userId: string ): Promise<AccessTokenAndrefreshTokenInterface> => {
//     try {
//         const user = await findUserById(userId)
//         if (user) {
//             const userWithId = user as UserDocument & { _id: string };
//             const [accessToken, refreshToken] = await Promise.all([userWithId.generateAccessToken(), userWithId.generateRefreshToken()])
//             user.refreshToken = refreshToken;
//             user.refreshToken = refreshToken;
//             await user.save({ validateBeforeSave: false });
//             return { accessToken, refreshToken }
//         } else throw new AppError("User not exist in the givenId for generating accesstoken and refreshtoken", HttpStatus.INTERNAL_SERVER_ERROR);
//     } catch (error) {
//         console.log(error)
//         throw new AppError("Something went wrong while generating the accesstoken and refreshtoken", HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }
