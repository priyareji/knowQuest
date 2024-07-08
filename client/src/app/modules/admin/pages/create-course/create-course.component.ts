import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnDestroy {
  createCourseFormGroup:FormGroup;
  private subscriptions = new Subscription();
  constructor( private _formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router){
      this.createCourseFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      })
  }
  createCourse(){
    const formValue = this.createCourseFormGroup.value;
    const payload = {
      courseName: formValue.courseName,
      description: formValue.description,
    };
    console.log(payload)
    this.subscriptions.add(
      this.dataService.createCourse(payload).subscribe(() => this.router.navigate(ROUTES.ADMIN.MANAGE_COURSES))
    );
  }
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}
