import { createAction, props } from "@ngrx/store";
import { UserState } from "src/app/core/models/state.model";

export const loginAction = createAction('[userLogin] click', props<{ email:string,password:string}>())
export const loginSuccess = createAction('[userLogin] user sucessfully login', props<{ loginSuccess: string, user: UserState,userLoggedIn:boolean}>())
export const loginFail = createAction('[userLogin] user login failed', props<{ loginError: string, userLoggedIn: boolean }>())

