import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from 'src/app/app-routes';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  isEditMode = false;
  studentId: string | null = null;

  createStudentForm: FormGroup;
  constructor(private authService:AuthService,private router:Router,private route: ActivatedRoute){
    this.createStudentForm=new FormGroup({
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
      console.log(params.get('studentId'));
      this.studentId = params.get('studentId');
      console.log(this.studentId,"instrid")
      this.isEditMode = !!this.studentId;

      if(this.isEditMode && this.studentId){
        this.authService.getStudentById(this.studentId).subscribe(studentdata => {
          const student =studentdata.data.user
          this.createStudentForm.patchValue(student)
          // this.createStudentForm.get('password')?.clearValidators();
          //   this.createStudentForm.get('password')?.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit(): void {
    if (this.createStudentForm.valid) {

      const payload = this.createStudentForm.value;
      if (this.isEditMode && this.studentId) {
        this.authService.updateStudent(this.studentId, payload).subscribe(() => {
          this.router.navigate(ROUTES.ADMIN.MANAGE_STUDENT);
        });
      } else {
      this.authService.createStudent(payload).
        subscribe((data:any) => {
          console.log(data,"datta")
          this.router.navigate(ROUTES.ADMIN.MANAGE_STUDENT);
    })

  }
  }

}

}


