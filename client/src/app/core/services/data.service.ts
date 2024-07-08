import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/apiResponse';
import { Observable, map } from 'rxjs';
import { Mode } from '../models/mode.model';
import { Batch } from '../models/batch';
import { Course } from '../models/course';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl:string = environment.API_URL;
  //alertService: any;
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
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/batches`,payload)
  }
  getBatchess(): Observable<Batch[]> {

    return this.http.get<Batch[]>(`${this.apiUrl}/admin/batches` )

  }
  deleteBatch(batchId: string): Observable<ApiResponse>  {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/batches/${batchId}`)

  }
  createCourse(payload:Record<string,string>){
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/course`,payload)
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
  updateSubjectStatus(subjectId: string, isActive: boolean): Observable<Subject> {
return this.http.patch<Subject>(`${this.apiUrl}/admin/subject/${subjectId}/status`,{isActive})
}
}
