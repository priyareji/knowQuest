import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-manage-instructor',
  templateUrl: './manage-instructor.component.html',
  styleUrls: ['./manage-instructor.component.scss']
})
export class ManageInstructorComponent implements OnInit {
  constructor(private authService:AuthService,private router: Router ){}
  displayedColumns: string[] =['Instructor Name','Email','Action']
  dataSource: [] = [];

  ngOnInit(): void {

    this.getAllInstructors();
  }
  getAllInstructors(){
this.authService.getAllInstructors().subscribe(response => {
  this.dataSource= response;
  console.log(this.dataSource)
},
error => {
  console.error('Error fetching instructors', error);
})
  }
  onClickEdit(instructorId: string) {
    console.log(instructorId)
    this.router.navigate(['admin', 'edit-instructor', instructorId]);
  }
}
