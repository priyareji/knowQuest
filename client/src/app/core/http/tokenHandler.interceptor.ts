import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.services";
import { ApiResponse } from "../models/apiResponse";



@Injectable()
export class TokenHandlerInterceptor implements HttpInterceptor{
  authService:AuthService = inject(AuthService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken()
    console.log(request.url);



    const authRequest = request.clone({
      headers: request.headers.set('authorization', `Bearer ${accessToken}`)
    })
    // if (accessToken) {
    //   return next.handle(authRequest).pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       console.log('error occured',error);
    //       if (error.status === 401) {

    //        return this.authService.refreshAccessToken().pipe(
    //          switchMap((response: ApiResponse) => {
    //            this.authService.setAccessToken(response.data.accessToken)
    //            this.authService.setRefreshToken(response.data.refreshToken)
    //            const newAuthRequest = request.clone({
    //             headers: request.headers.set('authorization', `Bearer ${response.data.accessToken}`)
    //            })
    //            return next.handle(newAuthRequest)
    //          }),
    //          catchError((refreshToken) => {
    //            this.authService.userLogout();
    //            return throwError(()=> refreshToken)
    //          })
    //         )
    //       }
    //       return throwError(()=> error)
    //     })
    //   )
    // }
    if(accessToken){
    return next.handle(authRequest).pipe(tap((event)=>{
      if(event.type===HttpEventType.Response)
      console.log(event.body,"event")
    }))
    }
    return next.handle(request)
  }
}
