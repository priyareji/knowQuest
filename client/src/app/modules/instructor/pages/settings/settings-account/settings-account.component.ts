import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss']
})
export class SettingsAccountComponent {

  changePasswordForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private instructorService:InstructorService,
    private snackBar: MatSnackBar
  ){
    this.changePasswordForm = this.fb.group({
      email:['',Validators.required],
      currentPassword:['',Validators.required],
      newPassword:['',Validators.required],
      confirmNewPassword:['',Validators.required]
    })
  }


changePassword(){
  const {email,currentPassword,newPassword,confirmNewPassword}=this.changePasswordForm.value;

  if(newPassword !== confirmNewPassword){
    this.snackBar.open('Passwords do not match!', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    return;
  }
this.instructorService.changePassword(this.changePasswordForm.value).subscribe(
  (res)=>{
    console.log('Password changed:',res);
    this.snackBar.open('Password changed successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    this.changePasswordForm.reset();
  },

  (error) => {
    console.error('Error changing password:', error);
    this.snackBar.open('Error changing password!', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

)


}


}
