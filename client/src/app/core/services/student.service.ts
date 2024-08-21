import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/apiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl:string = environment.API_URL;
  constructor(private http: HttpClient) { }

  getProfileDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/instructor/profiledetails`);
  }
}
