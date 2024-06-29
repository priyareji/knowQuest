export interface UserState {
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
    refreshToken?: string ;
}

export interface AuthState{
  userLoggedIn: boolean,
  user: UserState | null,
  loginSuccess: string | null,
  loginError: string |null
}
