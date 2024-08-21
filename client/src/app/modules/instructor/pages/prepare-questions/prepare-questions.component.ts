import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { questionUpdate } from 'src/app/core/models/question.model';
import { Subject } from 'src/app/core/models/subject';
import { DataService } from 'src/app/core/services/data.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-prepare-questions',
  templateUrl: './prepare-questions.component.html',
  styleUrls: ['./prepare-questions.component.scss']
})
export class PrepareQuestionsComponent implements OnInit, OnDestroy {


  subjectz:string[] = [];
  subjectDetails: { name: string; id: string }[] = [];
  subjects:Subject[] = []
  subject: { id: string; name: string; } | null = null;
  instructorSubjects: { subjectId: string; subjectName: string; batchId: string, batchName: string}[] = [];
  private subscriptions = new Subscription();
  userProfile :Instructor | null =null;
  createdQuestion: {
    question:string;
    questionType:string;
    mark:number;
  } = {
    question: '',
    questionType:'',
    mark:0
  };


  createdQuestions:{
    question:string;
    questionType:string;
    mark:number;
  }[]=[];


constructor(private instructorService:InstructorService,private dataService:DataService){}



  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          this.userProfile = profile.data.user;

          console.log(this.userProfile?.name)
          this.fetchSubjectNames()

        },
        error => {
           console.error('Error fetching user details', error);
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
  AddQuestion(){
if(!this.createdQuestion.question || this.createdQuestion.question == '' )return;
this.createdQuestions.push(this.createdQuestion);
this.createdQuestion = {
  question: '',
  questionType:'',
  mark:0
}
console.log(this.createdQuestions)
  }





  deleteQuestion(index:number){
    if(index<0)return;
    this.createdQuestions.splice(index,1)
  }
  onCreate(){

    let submitQuestion :questionUpdate={
      instructorId:this.userProfile?._id,
      instructorName:this.userProfile?.name,
      subjectId:this.subject?.id,
      subjectName:this.subject?.name,
      questions:this.createdQuestions
    }
    console.log(submitQuestion,"questionss")

    this.subscriptions.add(
      this.instructorService.createQuestion(submitQuestion).subscribe((res)=>{

      })
    )
  }

  ngOnDestroy(): void {
  }



}
