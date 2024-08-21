import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/core/models/student.model';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {

  bgButtonColors = ['#6A3CCD', '#08568E', '#2E7B14', '#A249CC', '#296B7B']
  profile: Student | any;
  private subscriptions = new Subscription();
  constructor(
   // private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    // this.subscriptions.add(this.userService.getCurrentUserProfile(true).subscribe(userProfile =>{
    //   if(userProfile) {
    //     console.log(userProfile);
    //     this.profile = userProfile;
    //   }
    // }));
  }

}
