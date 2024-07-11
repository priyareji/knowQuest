import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subject } from 'src/app/core/models/subject';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.scss']
})
export class ManageSubjectComponent implements OnInit, OnDestroy,AfterViewInit {
  dataSource = new MatTableDataSource<Subject>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['subjectName', 'courseName','action'];
  private subscriptions = new Subscription();
  matDialog:MatDialog = inject(MatDialog)
  constructor(
    private dataService: DataService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getSubjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }



  getSubjects() {
    this.subscriptions.add(
      this.dataService.getSubjects().subscribe((subjects: Subject[]) => {
        this.dataSource.data = subjects;
        console.log(this.dataSource)
      },
      err => {
        if(err.status == 500) this.dataSource.data = [];
      })
    );
  }

  onClickDelete(subjectId:string){
    this.subscriptions.add(
       this.matDialog.open(ConfirmDialogueComponent, {
        data:{title:"Confirmation",message: "Are you sure you want to Delete this Subject?"
    },
        disableClose:true
      }).afterClosed().subscribe((res) => {
        if (res) {
          this.dataService
            .deleteSubject(subjectId)
            .subscribe(() => this.getSubjects());
        }
        })
    );
  }

// activeStatus(subject: Subject): void {
//     const updatedStatus = !subject.isActive;
//     this.dataService.updateSubjectStatus(subject._id!, updatedStatus).subscribe((updatedSubject) => {
//       const index = this.dataSource.findIndex((s) => s._id === updatedSubject._id);
//       if (index !== -1) {
//         this.dataSource[index] = updatedSubject;
//       }
//     });
//   }


}
