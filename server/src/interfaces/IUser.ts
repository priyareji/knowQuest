export interface IUser {
    name: string;
    email: string;
    password: string;
    phonenumber?: number;
    role: 'admin' | 'instructor' | 'student';
    isAdmin?: boolean;
    course?: string;
    batch?: string;
    subject?: string;
    mode?: string;
  }