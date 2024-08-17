import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Batch } from 'src/app/core/models/batch';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss']
})
export class ManageBranchComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource=  new MatTableDataSource<Batch>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['batchName', 'modeName','action'];
  private subscriptions = new Subscription();
  matDialog:MatDialog = inject(MatDialog)
  constructor(
    private dataService: DataService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getBatches();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  getBatches() {
    this.subscriptions.add(
      this.dataService.getBatchess().subscribe((batches: Batch[]) => {
        this.dataSource.data = batches;
        console.log(this.dataSource)
      },
      err => {
        if(err.status == 500) this.dataSource.data = [];
      })
    );
  }
  onClickDelete(batchId:string){
    this.subscriptions.add(
       this.matDialog.open(ConfirmDialogueComponent, {
        data:{title:"Confirmation",message: "Are you sure you want to Delete this Batch?"
    },
        disableClose:true
      }).afterClosed().subscribe((res) => {
        if (res) {
          this.dataService
            .deleteBatch(batchId)
            .subscribe(() => this.getBatches());
        }
        })
    );
  }
  onClickEdit(BatchId: string) {
    console.log(BatchId)
    this.router.navigate(ROUTES.ADMIN.EDIT_Batch(BatchId));
  }
  }



