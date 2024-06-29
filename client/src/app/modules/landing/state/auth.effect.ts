import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/core/services/auth.services";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/store/app.state";
import { Router } from "@angular/router";
import { loginAction, loginFail, loginSuccess } from "./auth.actions";
import { UserState } from "src/app/core/models/state.model";
import { of } from "rxjs";

@Injectable()
  export class AuthEffects{
    constructor(private action$:Actions,private store: Store<AppState>,
      private router: Router){}
    authService = inject(AuthService)
    loginUser$ = createEffect(() =>
      this.action$.pipe(
          ofType(loginAction),
          switchMap(({ email, password }) => {
              const payload: Record<string, string> = { email: email, password: password }
              return this.authService.login(payload).pipe(
                  map((response) => {
                      const props = {
                          loginSuccess: response.message,
                          user:response.data.user,
                          userLoggedIn: true
                      }
                      if (response.statusCode === 200) {
                          console.log(response);
                          this.authService.setAccessToken(response.data?.accessToken as string)
                          this.authService.setRefreshToken(response.data?.refreshToken as string)
                          if(response.data?.user?.role==='admin')this.router.navigate(['admin'])
                            else if(response.data?.user?.role==='student')this.router.navigate(['student'])
                            else if(response.data?.user?.role==='instructor')this.router.navigate(['instructor'])
                          return loginSuccess(props)
                      }
                      throw new Error("Something went wrong")
                  }),
                  catchError((error)=> {
                      const props = {
                          userLoggedIn: false,
                          loginError:error.message
                      }
                      return of(loginFail(props))
                  })
              )
          })
      )
  )
}
