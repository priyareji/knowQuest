import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/apiResponse';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mode } from '../models/mode.model';
import { Batch } from '../models/batch';
import { Course } from '../models/course';
import { Subject } from '../models/subject';
import { UnitUpdate } from '../models/unit.model';
import { AssignmentUpdate } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl:string = environment.API_URL;

  constructor(private  http:HttpClient) { }
  createMode(modeName:string){
    let body = {
      modeName:modeName,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/createmode`,body)
  }
  getAllModes(): Observable<Mode[]> {

    return this.http.get<Mode[]>(`${this.apiUrl}/admin/modes` )

  }
  deleteMode(modeId: string): Observable<Mode[]>  {
    return this.http.delete<Mode[]>(`${this.apiUrl}/admin/modes/${modeId}`)

  }
  createBranch(payload:Record<string,string>){
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/batches`,payload).pipe(
      catchError((error:HttpErrorResponse) => {
        // const err = {
        //   message: error?.error?.errorMessage,
        //   statusCode:error.status
        // }
        console.log(error)
        return throwError(()=>error)
      })
    );
  }
  getBatchess(): Observable<Batch[]> {

    return this.http.get<Batch[]>(`${this.apiUrl}/admin/batches` )

  }
  updatebatch(batchId:string,payload:Record<string,string>){
    return this.http.put(`${this.apiUrl}/admin/batches/${batchId}`, payload);
  }
  deleteBatch(batchId: string): Observable<ApiResponse>  {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/batches/${batchId}`)

  }
  getBatchById(batchId:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.apiUrl}/admin/batches/${batchId}`)
  }
  createCourse(payload:Record<string,string>){
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/course`,payload)
  }
  getCourseById(Id:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.apiUrl}/admin/course/${Id}`)
  }
  updateCourse(id:string,payload:Record<string,string>){
    return this.http.put(`${this.apiUrl}/admin/course/${id}`, payload);
  }
  getCourse(): Observable<Course[]> {

    return this.http.get<Course[]>(`${this.apiUrl}/admin/course` )

  }
  deleteCourse(courseId: string): Observable<ApiResponse>  {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/course/${courseId}`)

  }
  createSubject(payload:Record<string,string>){
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/subject`,payload)
  }
  getSubjects(): Observable<Subject[]> {

    return this.http.get<Subject[]>(`${this.apiUrl}/admin/subject` )

  }
  deleteSubject(subjectId: string): Observable<ApiResponse>  {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/subject/${subjectId}`)

  }
  getSubjectById(subjectId: string): Observable<ApiResponse>  {
    return this.http.get<ApiResponse>(`${this.apiUrl}/admin/subject/${subjectId}`)

  }
  updateSubject(id:string,payload:Record<string,string>){
    return this.http.put(`${this.apiUrl}/admin/subject/${id}`, payload);
  }
  updateSubjectStatus(subjectId: string, isActive: boolean): Observable<Subject> {
return this.http.patch<Subject>(`${this.apiUrl}/admin/subject/${subjectId}/status`,{isActive})
}




}
