import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<Instructor>();
  private subscriptions = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnInit(): void {

    this.getAllInstructors();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getAllInstructors(){
    this.subscriptions.add(
     this.authService.getAllInstructors().subscribe((instructor: Instructor[]) => {
       this.dataSource.data = instructor;
       console.log(this.dataSource)
     },
     err => {
       if(err.status == 500) this.dataSource.data = [];
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
