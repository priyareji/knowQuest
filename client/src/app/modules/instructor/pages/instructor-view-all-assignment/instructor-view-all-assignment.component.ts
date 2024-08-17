import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/core/models/assignment.model';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-instructor-view-all-assignment',
  templateUrl: './instructor-view-all-assignment.component.html',
  styleUrls: ['./instructor-view-all-assignment.component.scss']
})
export class InstructorViewAllAssignmentComponent implements OnInit, OnDestroy {

  assignments: Assignment[] = [];

  private subscriptions = new Subscription();
  constructor(
    private instructorService: InstructorService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAssignments() {
    this.subscriptions.add(
      this.instructorService.getAssignmentsByInstructorId().subscribe(
        (ass) => {
          console.log(ass)
        this.assignments = ass?.data?.user;
        console.log(this.assignments)
      })
    );

  }

  onClickViewAssignment(assignmentId: string) {
    this.router.navigateByUrl(`/instructor/assignment-status/${assignmentId}`);
  }
}

