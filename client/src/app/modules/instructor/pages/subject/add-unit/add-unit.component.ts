import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitUpdate } from 'src/app/core/models/unit.model';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent {
  unitName: string = '';
  subjectId: string | null = '' ;
  private subscriptions = new Subscription();
constructor(private instructorService:InstructorService,private route:ActivatedRoute){
  this.subscriptions.add(this.route.parent?.paramMap.subscribe((params)=>{
    if(params.get('subjectId')){
      this.subjectId = params.get('subjectId')
    }
  }))
}
  ngOnInit(): void {

  }
onClickCreate(){
  let unitUpdate:UnitUpdate = {
    unitName:this.unitName,
    subjectId:this.subjectId,
    instructorId:"",
  }
  this.subscriptions.add(this.instructorService.createUnit(unitUpdate).subscribe(()=>{
    this.unitName = '';
  }))
}


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

