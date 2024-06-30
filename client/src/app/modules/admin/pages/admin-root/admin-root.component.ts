import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private router: Router) {}

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
    // this.authService.logout();
    // this.router.navigate(['']);
  }
}
