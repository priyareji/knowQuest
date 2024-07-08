import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from 'src/app/app-routes';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss']
})
export class CreateInstructorComponent implements OnInit {

  createInstructorForm: FormGroup;
  isEditMode = false;
  instructorId: string | null = null;

constructor(private authService:AuthService,private router:Router,private route: ActivatedRoute){
  this.createInstructorForm=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    phonenumber:new FormControl(null,[Validators.required]),
    course:new FormControl(null,[Validators.required]),
    batch:new FormControl(null,[Validators.required]),
    mode:new FormControl(null,[Validators.required]),

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

}
