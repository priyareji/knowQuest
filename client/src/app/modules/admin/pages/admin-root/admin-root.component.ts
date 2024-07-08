import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.services';
import { logout } from 'src/app/modules/landing/state/auth.actions';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent {
  hideIconContainer = false;

  isStudentPanelOpen = false;
  isCoursesPanelOpen = false;
  isInstructorsPanelOpen = false;
  isBatchesPanelOpen = false;
  isSubjectsPanelOpen = false;
  isSettingsPanelOpen = false;
  isReportPanelOpen = false;

  matDialog:MatDialog = inject(MatDialog)
  store:Store<AppState> = inject(Store<AppState>)
  constructor( private router: Router ,private authService:AuthService) {}

  ngOnInit(): void {}

  onClickLink(link: string) {
    this.closePanels();
    this.router.navigate(['/admin', link]);
  }

  closePanels() {
    this.isStudentPanelOpen = false;
    this.isCoursesPanelOpen = false;
    this.isInstructorsPanelOpen = false;
    this.isBatchesPanelOpen = false;
    this.isSubjectsPanelOpen = false;
    this.isSettingsPanelOpen = false;
    this.isReportPanelOpen = false;
  }

  logout() {
    const dialogRef = this.matDialog.open(ConfirmDialogueComponent, {
      data:{title:"Confirmation",message: "Are you sure you want to perform this action?"
  },
      disableClose:true
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(logout())
      }
      })


  }
}
