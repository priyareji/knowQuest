import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Subject } from 'src/app/core/models/subject';
import { AuthService } from 'src/app/core/services/auth.services';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss']
})
export class CreateInstructorComponent implements OnInit,OnDestroy {

  createInstructorForm: FormGroup;
  isEditMode = false;
  instructorId: string | null = null;
  subjectlist: Subject[]=[]
  private subscriptions = new Subscription();
constructor(private authService:AuthService,private router:Router,private route: ActivatedRoute, private dataService: DataService,){
  this.createInstructorForm=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    phonenumber:new FormControl(null,[Validators.required]),
    course:new FormControl(null,[Validators.required]),
    batch:new FormControl(null,[Validators.required]),
    mode:new FormControl(null,[Validators.required]),
    subjects:new FormControl([],[Validators.required]),

  })
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    console.log(params.get('instructorId'));
    this.instructorId = params.get('instructorId');
    console.log(this.instructorId,"instrid")
    this.isEditMode = !!this.instructorId;

    if(this.isEditMode && this.instructorId){
      this.authService.getInstructorById(this.instructorId).subscribe(instructordata => {
        const instructor =instructordata.data.user
        this.createInstructorForm.patchValue(instructor)
        this.createInstructorForm.get('password')?.clearValidators();
          this.createInstructorForm.get('password')?.updateValueAndValidity();
      });
    }
  });
  this.getSubjects()
}


getSubjects() {
  this.subscriptions.add(
    this.dataService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjectlist=subjects
      console.log( this.subjectlist)
    },
    err => {
      if(err.status == 500) this.subjectlist= [];
    })
  );
}


onSubmit(): void {
  if (this.createInstructorForm.valid) {
    const payload = this.createInstructorForm.value;
    if (this.isEditMode && this.instructorId) {
      this.authService.updateInstructor(this.instructorId, payload).subscribe(() => {
        this.router.navigate(ROUTES.ADMIN.MANAGE_INSTRUCTORS);
      });
    } else {

    this.authService.createInstructor(payload).
      subscribe((data: any) => {
        console.log(data)
        this.router.navigate(ROUTES.ADMIN.MANAGE_INSTRUCTORS);
  })
    }
}
}
ngOnDestroy() {
  this.subscriptions.unsubscribe();
}
}
