import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-mode',
  templateUrl: './create-mode.component.html',
  styleUrls: ['./create-mode.component.scss']
})
export class CreateModeComponent implements OnInit,OnDestroy {
  modeName:string='';
private subscriptions = new Subscription();

constructor(private dataService:DataService, private router: Router){}
ngOnInit(): void {

}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
createMode(){
  this.subscriptions.add(
    this.dataService.createMode(this.modeName).subscribe(()=>{
      this.modeName = '';
      this.router.navigate(ROUTES.ADMIN.MANAGE_MODE);
    })
  )
}
}
