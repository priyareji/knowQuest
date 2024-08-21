import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/core/models/instructor.model';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-settings-profile-view',
  templateUrl: './settings-profile-view.component.html',
  styleUrls: ['./settings-profile-view.component.scss']
})
export class SettingsProfileViewComponent implements OnInit,OnDestroy {
  private subscriptions = new Subscription();
  userProfile :Instructor | null =null;

  constructor(private instructorService:InstructorService){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.instructorService.getProfileDetails().subscribe(
        profile => {
          console.log( profile)
          this.userProfile = profile.data.user;

          console.log(this.userProfile?.name)


        },
        error => {
           console.error('Error fetching user details', error);
        }
      )
    );


  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
