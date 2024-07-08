import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';
import { Student } from "../../../../core/models/student.model";
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit,OnDestroy {
  constructor(private authService:AuthService,private router: Router  ){}
  dataSource: Student[] = [];
  private subscriptions = new Subscription();
  ngOnInit(): void {

    this.getAllStudents();
  }
  getAllStudents(){
 this.subscriptions.add(
  this.authService.getAllStudents().subscribe((students: Student[]) => {
    this.dataSource = students;
    console.log(this.dataSource)
  },
  err => {
    if(err.status == 500) this.dataSource = [];
  })
);
  }

  onClickEdit(studentId: string) {
    console.log(studentId)
    this.router.navigate(ROUTES.ADMIN.EDIT_STUDENT(studentId));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
