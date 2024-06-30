import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse } from "../models/apiResponse";
  @Injectable({
    providedIn:'root'
  })
  export class AuthService{
    private apiUrl = 'http://localhost:3000/api/v1';
    constructor(private http:HttpClient){

    }
    login(payload: Record<string, string>){
      console.log("hello")
      return this.http.post<ApiResponse>(`${this.apiUrl}/auth/login`,payload).pipe(
        catchError((error: HttpErrorResponse) => {
          const err = {
            message: error?.error?.errorMessage,
            statusCode:error.status
          }
          return throwError(()=>err)
        })
      )
    }
    createStudent(payload:Record<string,string>){
      return this.http.post<ApiResponse>(`${this.apiUrl}/admin/createStudent`,payload)
    }
    createInstructor(payload:Record<string,string>){
      return this.http.post<ApiResponse>(`${this.apiUrl}/admin/createInstructor`,payload)
    }
    getAllInstructors(): Observable<any> {
      return this.http.get(`${this.apiUrl}/admin/getAllInstructors`);
    }
    getAllStudents(): Observable<any> {
      return this.http.get(`${this.apiUrl}/admin/getAllStudents`);
    }
    getInstructorById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/admin/get-instructor/${id}`);
    }

    updateInstructor(id: string, instructorData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/admin/edit-instructor/${id}`, instructorData);
    }
    getStudentById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/admin/get-student/${id}`);
    }

    updateStudent(id: string, studentData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/admin/edit-student/${id}`, studentData);
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
