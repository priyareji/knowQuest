import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { Subject } from 'src/app/core/models/subject';
import { AuthService } from 'src/app/core/services/auth.services';
import { DataService } from 'src/app/core/services/data.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-instructor-subject-list',
  templateUrl: './instructor-subject-list.component.html',
  styleUrls: ['./instructor-subject-list.component.scss']
})
export class InstructorSubjectListComponent implements OnInit,OnDestroy {
  profileDetails :Instructor | null =null;
  private subscriptions = new Subscription();
  subjectz:string[] = [];
  subjectDetails: { name: string; id: string }[] = [];
  subjects:Subject[] = []
  name:string="";
  id:string=""
  constructor(private instructorService:InstructorService,private router:Router,private dataService:DataService){}
  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          this.profileDetails = profile.data.user;
          this.fetchSubjectNames();
          console.log(this.profileDetails?.name)
        },
        error => {
          console.error('Error fetching user details', error);
        }
      )
    );
  }
  fetchSubjectNames() {
    this.profileDetails?.subjects.forEach((subjectId: string) => {
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
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
