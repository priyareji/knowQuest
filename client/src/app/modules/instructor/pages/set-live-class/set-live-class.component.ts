import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { liveClassUpdate } from 'src/app/core/models/liveClass.model';
import { DataService } from 'src/app/core/services/data.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-set-live-class',
  templateUrl: './set-live-class.component.html',
  styleUrls: ['./set-live-class.component.scss']
})
export class SetLiveClassComponent implements OnInit, OnDestroy {
  profile :Instructor | null =null;
  private subscriptions = new Subscription();
  liveClassFormGroup:FormGroup;
  subjectDetails: { name: string; id: string }[] = [];
  constructor( private _formBuilder: FormBuilder,private instructorService:InstructorService,private dataService:DataService,private router:Router)
  {
    this.liveClassFormGroup = this._formBuilder.group({
           subject:['',Validators.required],
           date:['',Validators.required],
           startTime:['',Validators.required],
           endTime:['',Validators.required],
           details:['',Validators.required],
           link:['',Validators.required]

    })

  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        userprofile => {
          console.log( userprofile)
          this.profile = userprofile.data.user;

          console.log(this.profile?.name)
          this.fetchSubjectNames();
        },
        error => {
          // console.error('Error fetching user details', error);
        }
      )
    );

  }
  fetchSubjectNames() {
    this.profile?.subjects.forEach((subjectId: string) => {
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

onClickCreate(){

  console.log(this.liveClassFormGroup.value)
  let liveUpdate:liveClassUpdate={
subjectId:this.liveClassFormGroup.value.subject.id,
subjectName:this.liveClassFormGroup.value.subject.name,
instructorId:this.profile?._id,
instructorName:this.profile?.name,
date:this.liveClassFormGroup.value.date,
startTime:this.liveClassFormGroup.value.startTime,
endTime:this.liveClassFormGroup.value.endTime,
details:this.liveClassFormGroup.value.details,
link:this.liveClassFormGroup.value.link

 }
 console.log(liveUpdate)
//  this.subscriptions.add(
//   this.instructorService.createQuestion(submitQuestion).subscribe((res)=>{

//   })
// )

this.subscriptions.add(
  this.instructorService.createLiveClass(liveUpdate).subscribe((res)=>{

  })
)

}



}
