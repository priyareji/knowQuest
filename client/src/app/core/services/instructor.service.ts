import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Unit, UnitUpdate } from '../models/unit.model';
import { Instructor } from '../models/instructor.model';
import { ApiResponse } from '../models/apiResponse';
import { Chapter, ChapterUpdate } from '../models/chapter.model';
import { Section, SectionUpdate } from '../models/section.model';
import { BookUpdate } from '../models/book.model';
import { VideoUpdate } from '../models/video.model';
import { AssignmentUpdate } from '../models/assignment.model';
//import { AlertService } from './alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl:string = environment.API_URL;
  constructor(private http: HttpClient) { }

  getProfileDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/instructor/profiledetails`);
  }
  createUnit(unit:UnitUpdate){
    return this.http.post<ApiResponse>(`${this.apiUrl}/instructor/createUnit`,unit)
    .pipe(map((response:ApiResponse)=>{
    //   if(response.success)this.alertService.success(response.message);
      return response.data
     }))
  }

  getUnitsBySubjectId(subjectId:string):Observable<Unit[]>{
    return this.http.get<ApiResponse>(`${this.apiUrl}/instructor/getUnitsBySubjectId/${subjectId}`).pipe(map((response)=>{
      return response.data
    }))
  }
createChapter(chapterUpdate:ChapterUpdate){
  return this.http.post<ApiResponse>(`${this.apiUrl}/instructor/createChapter`,chapterUpdate)
  .pipe(map((response:ApiResponse)=>{
    //   if(response.success)this.alertService.success(response.message);
      return response.data
     }))
}
createSection(sectionUpdate: SectionUpdate) {

  let update : any= sectionUpdate;
  let formData = new FormData();
  for (let key in update) {
    formData.append(key, update[key]);
  }
  formData.delete('files');
  if (sectionUpdate.files) {
    for (let file of sectionUpdate.files) {
      formData.append('files[]', file, file.name);
    }
  }
  return this.http
    .post(this.apiUrl + '/instructor/createSection', formData)
  }
  createBook(bookUpdate: BookUpdate) {
    debugger;
     let SubjectId=bookUpdate.subjectId;
     let update: any = bookUpdate;
     let formData = new FormData();
     for (let key in update) {
       formData.append(key, update[key]);
     }
     formData.delete('files');
     if(bookUpdate.files) {
       for(let file of bookUpdate.files) {
        formData.append('files[]', file, file.name);
       }
     }

    return this.http.post(this.apiUrl + '/instructor/addBook', formData)
  }
  createLibraryVideo(videoUpdate: VideoUpdate) {
    debugger;
    let SubjectId=videoUpdate.subjectId;
    console.log("subjectId",SubjectId);
    return this.http.put(this.apiUrl + '/instructor/addVideo/'+SubjectId,  videoUpdate)
  //   .pipe(
  //   map((response: ApiResponse) => {
  //     if (response.success) this.alertService.success(response.message);
  //     return response.data;
  //   })
  // );
}
getChaptersByUnitId(unitId: string):Observable<Chapter[]> {
  return this.http.get<ApiResponse>(`${this.apiUrl}/instructor/getChaptersByUnitId/${unitId}`).pipe(map((response:ApiResponse)=>{
    return response.data
  }))
}

getSectionsByChapterId(chapterId: string):Observable<Section[]> {
  return this.http
    .get<ApiResponse>(`${this.apiUrl}/instructor/getSectionsByChapterId/${chapterId}`).pipe(map((response:ApiResponse)=>{
      return response.data
    }))
}

// createAssignment(assignmentUpdate: AssignmentUpdate) {
//   let update: any = assignmentUpdate;
//   console.log(update);

//   let formData = new FormData();
//   for (let key in update) {
//     formData.append(key, update[key]);
//   }
//   formData.delete('file');
//   formData.delete('questions');

//   if (assignmentUpdate.questionType == 'upload-file') {
//     if (assignmentUpdate.file) {
//       formData.append(
//         'file[]',
//         assignmentUpdate.file,
//         assignmentUpdate.file.name
//       );
//     }
//   } else if (
//     assignmentUpdate.questionType == 'custom' &&
//     assignmentUpdate.questions
//   ) {
//     let index = 0;

//     for (let question of assignmentUpdate.questions) {
//       formData.append('questions[].question[]', question.question);
//       if(question.file){
//         formData.append('questions[].file[]', question.file, `${index}`);
//       }
//       index++;
//     }
//   }

//   // Log FormData entries
//   console.log('FormData contents:');
//   formData.forEach((value, key) => {
//     if (value instanceof File) {
//       console.log(key, ': File -', value.name);
//     } else {
//       console.log(key, ':', value);
//     }
//   });

//   return this.http.post(this.apiUrl + '/instructor/createAssignment', formData);
// }

// createAssignment(assignmentUpdate: AssignmentUpdate) {
//   let update: any = assignmentUpdate;
//   console.log(update);

//   let formData = new FormData();
//   for (let key in update) {
//     formData.append(key, update[key]);
//   }
//   formData.delete('file');
//   formData.delete('questions');

//   if (assignmentUpdate.questionType == 'upload-file') {
//     if (assignmentUpdate.file) {
//       formData.append(
//         'file[]',
//         assignmentUpdate.file,
//         assignmentUpdate.file.name
//       );
//     }
//   } else if (
//     assignmentUpdate.questionType == 'custom' &&
//     assignmentUpdate.questions
//   ) {
//     let index = 0;

//     for (let question of assignmentUpdate.questions) {
//       formData.append('questions[].question[]', question.question);
//       if(question.file){
//         formData.append('questions[].file[]', question.file, `${index}`);
//       }
//       index++;
//     }
//   }

//   // Log FormData contents
//   console.log('FormData contents:');
//   formData.forEach((value, key) => {
//     if (value instanceof File) {
//       console.log(key, ': File -', value.name);
//     } else {
//       console.log(key, ':', value);
//     }
//   });

//   return this.http.post(this.apiUrl + '/instructor/createAssignment', formData);
// }

createAssignment(assignmentUpdate: AssignmentUpdate) {
  let formData = new FormData();
  formData.append('assignmentUpdate', JSON.stringify(assignmentUpdate));

  if (assignmentUpdate.file) {
    formData.append('file', assignmentUpdate.file, assignmentUpdate.file.name);
  }

  if (assignmentUpdate.questions) {
    assignmentUpdate.questions.forEach((question, index) => {
      formData.append(`questions[${index}].question`, question.question);
      if (question.file) {
        formData.append(`questions[${index}].file`, question.file, question.file.name);
      }
    });
  }

  return this.http.post(this.apiUrl + '/instructor/createAssignment', formData);
}

getAssignmentsByInstructorId(): Observable<ApiResponse>{
  return this.http
  .get<ApiResponse>(`${this.apiUrl}/instructor/getAssignmentsByInstructorId`
   )
  // .pipe(
  //   map((response: ApiResponse) => {
  //     return response.data;
  //   })
 // );
}

}
