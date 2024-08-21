import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { Student } from 'src/app/core/models/student.model';
import { AuthService } from 'src/app/core/services/auth.services';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-root',
  templateUrl: './student-root.component.html',
  styleUrls: ['./student-root.component.scss']
})
export class StudentRootComponent implements OnInit {
  profile:Instructor|null=null;

  private subscriptions = new Subscription();
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(this.studentService.getProfileDetails().subscribe(userProfile =>{
      if(userProfile) {
        console.log(userProfile);
       // this.profile = userProfile;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickLink(link: string) {
    console.log(link);

    this.router.navigate(['/student', link]);
  }

  logout() {
    this.authService.userLogout();
    this.router.navigate(['']);
  }
}
