import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/core/services/auth.services";

@Injectable()
  export class AuthEffects{
    constructor(private action$:Actions){}
    authService = inject(AuthService)
    login$ = createEffect(()=>{
      return this.action$.pipe(ofType(loginStart),exhaustMap((action)=>{
        console.log("jjj")
        return this.authService.login(action.email,action.password).pipe(map((data)=>{
          return loginSuccess()
        }))
      })
    )
    })
  }

