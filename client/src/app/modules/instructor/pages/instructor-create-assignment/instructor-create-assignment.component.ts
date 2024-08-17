import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentUpdate } from 'src/app/core/models/assignment.model';
import { Instructor } from 'src/app/core/models/instructor.model';
import { Subject } from 'src/app/core/models/subject';
import { DataService } from 'src/app/core/services/data.service';
import { FileService } from 'src/app/core/services/file.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-instructor-create-assignment',
  templateUrl: './instructor-create-assignment.component.html',
  styleUrls: ['./instructor-create-assignment.component.scss']
})
export class InstructorCreateAssignmentComponent implements OnInit, OnDestroy {


  private subscriptions = new Subscription();
  userProfile :Instructor | null =null;
  assignmentTitle: string = "";
  subjectz:string[] = [];
  subjectDetails: { name: string; id: string }[] = [];
  subjects:Subject[] = []
  subject: { id: string; name: string; } | null = null;
  instructorSubjects: { subjectId: string; subjectName: string; batchId: string, batchName: string}[] = [];
  createQuestion: {
    question: string;
    file: any;
  } = {
    question: '',
    file: null,
  };

  isUploadFile: null | 'upload' | 'custom' = null;

  uploadedQuestionPaper: null | File = null;

  createdQuestions: {
    question: string;
    file: File ;
  }[] = [];
  constructor(private instructorService:InstructorService,private fileService:FileService,private dataService:DataService,private router:Router){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          this.userProfile = profile.data.user;

          console.log(this.userProfile?.name)
          this.fetchSubjectNames();
        },
        error => {
          // console.error('Error fetching user details', error);
        }
      )
    );

  }
  fetchSubjectNames() {
    this.userProfile?.subjects.forEach((subjectId: string) => {
      this.dataService.getSubjectById(subjectId).subscribe(
          (response) => {
            if(response && response.data.subject){
            const subject = response.data.subject[0];
             if (subject) {
              this.subjectDetails.push({
                name: subject.subjectName,
                id: subject._id
              });
               console.log(this.subjectDetails,"kjkjkewe")
              }

            }



       },
        (error) => console.error('Error fetching subject name', error)
      );
    });

   // console.log(this.subjectNames,"namess")
  // const firstSubject = this.subjectz[0];
  // console.log(firstSubject.subjectName);
  //   this.subjectNames = this.subjectz.map(subject => subject.subjectName);
  //   console.log(this.subjectNames);
   }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  updateFile(file: File | null) {
    console.log(file, "file1");
    if (!file) {
      this.createQuestion.file = null;
      return;
    }
    this.createQuestion.file = file;
  }


  updateWholeQuestionFile(file: File | null) {
    console.log(file, "file");
    if (!file) return;
    this.uploadedQuestionPaper = file;
  }

  deleteQuestion(index: number) {
    if (index < 0) return;
    this.createdQuestions.splice(index, 1);
  }

  onAddQuestion() {
    if (!this.createQuestion.question || this.createQuestion.question == '')
      return;
    this.createdQuestions.push(this.createQuestion);
    this.createQuestion = {
      question: '',
      file: null,
    };
    this.fileService.makeSelectedFileNull();
  }

  onCreateAssignment() {

    // console.log(this.subject, !this.isUploadFile);
       console.log(this.isUploadFile, "this.isUploadFile");
    if (!this.subject) return;
    if (!this.isUploadFile) return;
    let assignmentUpdate: AssignmentUpdate = {
      subjectId: this.subject.id,
      subjectName: this.subject.name,
      assignmentName: this.assignmentTitle,
       instructorId: this.userProfile?._id,
      instructorName: this.userProfile?.name,
      questionType: 'upload-file',
      // batchId: this.subject.batchId,
    };
    if (this.isUploadFile == 'upload') {
      assignmentUpdate.questionType = 'upload-file';
      assignmentUpdate.file = this.uploadedQuestionPaper;
      console.log(assignmentUpdate.file,"assignmentUpdate.file")
    } else if (this.isUploadFile == 'custom') {
      assignmentUpdate.questionType = 'custom';
      assignmentUpdate.questions = this.createdQuestions;
      console.log(assignmentUpdate.questions,"assignmentUpdate.filecustom")
    } else return;
console.log(assignmentUpdate,"updateee")
    this.subscriptions.add(
      this.instructorService
        .createAssignment(assignmentUpdate)
        .subscribe((res) => {
          this.router.navigate(['/instructor', 'assignment', 'view']);
        })
    );
  }


}
