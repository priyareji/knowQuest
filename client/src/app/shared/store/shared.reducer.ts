import { createReducer, on } from "@ngrx/store"
import { SharedState, initialState } from "./shared.state"
import { setErrorMessage, setLoadingSpinner } from "./shared.action"

export const _SharedReducer=createReducer(initialState,
  on(setLoadingSpinner,(state,action)=>{
    return{
      ...state,
      showLoading:action.status,
    }
  }),
  on(setErrorMessage,(state,action)=>{
    return{
      ...state,
      errorMessage:action.message,
    }
  })
  )
export function SharedReducer(state:SharedState,action:any){
  return _SharedReducer(state,action)
}
