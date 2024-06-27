
import { AuthState } from "src/app/modules/landing/state/auth.state";
import { SharedState } from "./shared.state";
import { AUTH_STATE_NAME } from "src/app/modules/landing/state/auth.selector";
import { AuthReducer } from "src/app/modules/landing/state/auth.reducer";

export interface AppState{
  //counter:CounterState;
  //posts:PostsState
  // [SHARED_STATE_NAME]:SharedState;
  [AUTH_STATE_NAME]:AuthState;
}

export const appReducer={

[AUTH_STATE_NAME]:AuthReducer
}
