import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse,ApiSuccess } from "../models/apiResponse";
import { environment } from "src/environments/environment.development";
import { Student } from "../models/student.model";
import { Instructor } from "../models/instructor.model";
//import {jwtDecode} from 'jwt-decode'
  @Injectable({
    providedIn:'root'
  })
  export class AuthService{
    private apiUrl:string = environment.API_URL;
     AuthorizationHeaderName = 'Authorization';
     AuthorizationHeaderTokenType = 'Bearer ';



    constructor(private http:HttpClient){

    }
    accessToken = this.getAccessToken();

     getAuthHeader(headers?: HttpHeaders) {
      if (!headers) headers = new HttpHeaders();

      headers = headers.set(
        this.AuthorizationHeaderName,
        this.AuthorizationHeaderTokenType + this.accessToken
      );
      return headers;
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
    getAllInstructors(): Observable<Instructor[]> {

      return this.http.get<Instructor[]>(`${this.apiUrl}/admin/getAllInstructors` )

    }
    getAllStudents(): Observable<Student[]> {

      return this.http.get<Student[]>(`${this.apiUrl}/admin/getAllStudents`);
    }
    getInstructorById(id: string): Observable<ApiSuccess<{ user: Instructor }>> {
      return this.http.get<ApiSuccess<{ user: Instructor }>>(`${this.apiUrl}/admin/get-instructor/${id}`);
    }

    updateInstructor(id: string, instructorData: Instructor[]){
      return this.http.put(`${this.apiUrl}/admin/edit-instructor/${id}`, instructorData);
    }
    getStudentById(id: string): Observable<ApiSuccess<{ user: Student}>> {
      return this.http.get<ApiSuccess<{ user: Student }>>(`${this.apiUrl}/admin/get-student/${id}`);
    }

    updateStudent(id: string, studentData: Student) {
      return this.http.put(`${this.apiUrl}/admin/edit-student/${id}`, studentData);
    }
    userLogout() {
      return this.http.post<ApiResponse>(this.apiUrl+'/admin/logout',{})
    }


    refreshAccessToken() {
      const incomingRefreshToken = this.getRefreshToken()
      return this.http.post<ApiResponse>(this.apiUrl+`/user/refreshToken`,{incomingRefreshToken:incomingRefreshToken})
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
