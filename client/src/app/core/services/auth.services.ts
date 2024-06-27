import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
  @Injectable({
    providedIn:'root'
  })
  export class AuthService{
    constructor(private http:HttpClient){

    }
    login(email:string,password:string){
      console.log("hello")
      return this.http.post('http://localhost:3000/api/auth/login',{email,password})
    }
  }
