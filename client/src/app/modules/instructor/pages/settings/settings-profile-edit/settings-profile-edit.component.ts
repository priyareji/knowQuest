import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { AuthService } from 'src/app/core/services/auth.services';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-settings-profile-edit',
  templateUrl: './settings-profile-edit.component.html',
  styleUrls: ['./settings-profile-edit.component.scss']
})
export class SettingsProfileEditComponent implements OnInit,OnDestroy {
  private subscriptions = new Subscription();
  userProfile :Instructor | null =null;
  editInstructorFormGroup: FormGroup;
  instructorId:string="";
  //private snackBar: MatSnackBar
  constructor(private instructorService:InstructorService,private authService:AuthService, private _formBuilder: FormBuilder,  private snackBar: MatSnackBar){
    this.editInstructorFormGroup = this._formBuilder.group({

      phonenumber: [[], Validators.required],
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          const instructor = profile.data.user;

          console.log(this.userProfile?.name)
          this.editInstructorFormGroup.patchValue(instructor)
          this.instructorId=instructor?._id

        },
        error => {
           console.error('Error fetching user details', error);
        }
      )
    );


  }
  onUpdate(){
    if (this.editInstructorFormGroup.valid) {
      const payload = this.editInstructorFormGroup.value;

        this.authService.updateInstructor(this.instructorId, payload).subscribe((res) => {
          console.log('Password changed:',res);
          this.snackBar.open('Password changed successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.editInstructorFormGroup.reset();

        });
      }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

