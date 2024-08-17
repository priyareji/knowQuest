import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructor-assignment-root',
  templateUrl: './instructor-assignment-root.component.html',
  styleUrls: ['./instructor-assignment-root.component.scss']
})
export class InstructorAssignmentRootComponent {
  activeLinkIndex = -1;
  navLinks: any[] = [
    {
      label: 'Create',
      link: './create',
      index: 0
    },
    {
      label: 'View',
      link: './view',
      index: 1
    },

  ];
  //private subscriptions = new Subscription();
  constructor(
    private router: Router
  ) {
    // this.subscriptions.add(
    //   this.router.events.subscribe(res => {
    //     this.activeLinkIndex = this.navLinks.indexOf(
    //       this.navLinks.find(tab => tab.link === '.' + this.router.url)
    //     );
    //   })
    // );
  }
}
