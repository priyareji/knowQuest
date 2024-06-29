import { AuthState } from "src/app/core/models/state.model";

// export interface AppState{
//   auth: AuthState
// }
export const initialState:AuthState = {
  userLoggedIn: false,
  user: null,
  loginSuccess: null,
  loginError: null,
};
