import { createSelector } from "@ngrx/store";
import { AuthState } from "src/app/core/models/state.model";

export interface AppState{
  auth: AuthState
}

export const loginSuccessState = (state: AppState) => state.auth.loginSuccess;
export const selectLoginSucessMessage = createSelector(
    loginSuccessState,(state)=> state
)
export const loginFailState = (state: AppState) => state.auth.loginError
export const selectLoginErrorMessage = createSelector(
    loginFailState,
    (state)=> state
)
