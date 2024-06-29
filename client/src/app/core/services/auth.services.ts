import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse } from "../models/apiResponse";
  @Injectable({
    providedIn:'root'
  })
  export class AuthService{
    constructor(private http:HttpClient){

    }
    login(payload: Record<string, string>){
      console.log("hello")
      return this.http.post<ApiResponse>('http://localhost:3000/api/v1/auth/login',payload).pipe(
        catchError((error: HttpErrorResponse) => {
          const err = {
            message: error?.error?.errorMessage,
            statusCode:error.status
          }
          return throwError(()=>err)
        })
      )
    }
    removeAccessToken(): void{
      window.localStorage.removeItem('accessToken')
    }
    getAccessToken() {
      return window.localStorage.getItem('accessToken')
    }
    setAccessToken(token: string) {
      window.localStorage.setItem('accessToken',token)
    }
    setRefreshToken( token: string) {
      window.localStorage.setItem('refreshToken',token)
    }
      getRefreshToken() {
        return window.localStorage.getItem('refreshToken')
      }
      removeRefreshToken(): void{
      window.localStorage.removeItem('refreshToken')
      }
  }
