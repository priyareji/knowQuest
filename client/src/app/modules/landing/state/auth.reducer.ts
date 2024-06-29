import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginAction, loginSuccess } from "./auth.actions";



export const authReducer=createReducer(initialState,
  on(loginAction,(state)=>{
    return{
      ...state,
    }
  }),
  on(loginSuccess, (state, action) => {
    return {
        ...state,
        userLoggedIn: action.userLoggedIn,
        user: action.user,
        loginSuccess: action.loginSuccess,
        loginError: null
    }
}
),

)


// export function AuthReducer(state:any,action:any){
//   return _authReducer(state,action)
// }
