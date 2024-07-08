import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Batch } from 'src/app/core/models/batch';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss']
})
export class ManageBranchComponent implements OnInit, OnDestroy {
  dataSource: Batch[] = [];
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
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  getBatches() {
    this.subscriptions.add(
      this.dataService.getBatchess().subscribe((batches: Batch[]) => {
        this.dataSource = batches;
        console.log(this.dataSource)
      },
      err => {
        if(err.status == 500) this.dataSource = [];
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
  }



