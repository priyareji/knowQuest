import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {
  constructor(private authService:AuthService,private router: Router  ){}
  dataSource: [] = [];

  ngOnInit(): void {

    this.getAllStudents();
  }
  getAllStudents(){
this.authService.getAllStudents().subscribe(response => {
  this. dataSource = response;
  console.log(this.dataSource)
},
error => {
  console.error('Error fetching instructors', error);
})
  }

  onClickEdit(studentId: string) {
    console.log(studentId)
    this.router.navigate(['admin', 'edit-student', studentId]);
  }
}
