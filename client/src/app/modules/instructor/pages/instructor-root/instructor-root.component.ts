import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { AuthService } from 'src/app/core/services/auth.services';
import { InstructorService } from 'src/app/core/services/instructor.service';
import { logout } from 'src/app/modules/landing/state/auth.actions';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-instructor-root',
  templateUrl: './instructor-root.component.html',
  styleUrls: ['./instructor-root.component.scss']
})
export class InstructorRootComponent implements OnInit, OnDestroy {
  matDialog:MatDialog = inject(MatDialog)
  store:Store<AppState> = inject(Store<AppState>)
  profileDetails :Instructor | null =null;
  private subscriptions = new Subscription();
  constructor(private instructorService:InstructorService,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          this.profileDetails = profile.data.user;

          console.log(this.profileDetails?.name)
        },
        error => {
          console.error('Error fetching user details', error);
        }
      )
    );

  }
//   this.authService.getInstructorById(this.instructorId).subscribe(instructordata => {
//     const instructor =instructordata.data.user

// }
logout() {
  const dialogRef = this.matDialog.open(ConfirmDialogueComponent, {
    data:{title:"Confirmation",message: "Are you sure you want to logout?"
},
    disableClose:true
  }).afterClosed().subscribe((res) => {
    if (res) {
      this.store.dispatch(logout())
    }
    })


}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}
