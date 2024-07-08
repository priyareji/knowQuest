import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mode } from 'src/app/core/models/mode.model';

import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-mode',
  templateUrl: './manage-mode.component.html',
  styleUrls: ['./manage-mode.component.scss']
})
export class ManageModeComponent {
  private subscriptions = new Subscription();
  matDialog:MatDialog = inject(MatDialog)
  constructor(private dataService:DataService,
  private router: Router ){}
  displayedColumns: string[] =['modeName','Action']
  dataSource: Mode[] = [];

  ngOnInit(): void {

    this.getAllModes();
  }
  getAllModes(){
this.dataService.getAllModes().subscribe(response => {
  this.dataSource= response;
  console.log(this.dataSource)
},
error => {
  console.error('Error fetching instructors', error);
})
  }
  onClickDelete(modeId:string){
     const dialogRef = this.matDialog.open(ConfirmDialogueComponent, {
      data:{title:"Confirmation",message: "Are you sure you want to Delete this Mode?"
  },
      disableClose:true
    }).afterClosed().subscribe((res) => {
      if (res) {
      this.dataService.deleteMode(modeId).subscribe(
        ()=>this.getAllModes(),
        error=>{
          console.error(error.message)
        }
      )}
    })
  }


}
