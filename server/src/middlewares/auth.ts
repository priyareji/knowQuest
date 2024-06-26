import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const authMiddleware = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserDocument;
      req.user = decoded;
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
      }
      next();
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
};
