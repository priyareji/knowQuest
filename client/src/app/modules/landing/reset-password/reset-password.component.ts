import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  token: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: [''],
    });
    this.token = this.route.snapshot.queryParamMap.get('token')!;
  }

  resetPassword() {
    this.userService.resetPassword(this.token, this.resetPasswordForm.value.newPassword).subscribe(response => {
      console.log('Password reset:', response);
    });
  }
}
