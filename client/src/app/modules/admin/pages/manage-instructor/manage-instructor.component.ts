import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Instructor } from 'src/app/core/models/instructor.model';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-manage-instructor',
  templateUrl: './manage-instructor.component.html',
  styleUrls: ['./manage-instructor.component.scss']
})
export class ManageInstructorComponent implements OnInit,OnDestroy {
  constructor(private authService:AuthService,private router: Router ){}
  displayedColumns: string[] =['Instructor Name','Email','Action']
  dataSource: Instructor[] = [];
  private subscriptions = new Subscription();
  ngOnInit(): void {

    this.getAllInstructors();
  }

  getAllInstructors(){
    this.subscriptions.add(
     this.authService.getAllInstructors().subscribe((instructor: Instructor[]) => {
       this.dataSource = instructor;
       console.log(this.dataSource)
     },
     err => {
       if(err.status == 500) this.dataSource = [];
     })
   );
     }

     ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

  onClickEdit(instructorId: string) {
    console.log(instructorId)
    this.router.navigate(ROUTES.ADMIN.EDIT_INSTRUCTOR(instructorId));
  }
}
