import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit, OnDestroy, AfterViewInit{
  dataSource= new MatTableDataSource<Course>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['courseName','action'];
  private subscriptions = new Subscription();
  matDialog:MatDialog = inject(MatDialog)
  constructor(
    private dataService: DataService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getCourse();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  getCourse() {
    this.subscriptions.add(
      this.dataService.getCourse().subscribe((course: Course[]) => {
        this.dataSource.data = course;
        console.log(this.dataSource)
      },
      err => {
        if(err.status == 500) this.dataSource.data= [];
      })
    );
  }
  onClickDelete(courseId:string){
    this.subscriptions.add(
       this.matDialog.open(ConfirmDialogueComponent, {
        data:{title:"Confirmation",message: "Are you sure you want to Delete this Course?"
    },
        disableClose:true
      }).afterClosed().subscribe((res) => {
        if (res) {
          this.dataService
            .deleteCourse(courseId)
            .subscribe(() => this.getCourse());
        }
        })
    );
  }
}
