import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorViewAssignmentComponent } from './instructor-view-assignment.component';

describe('InstructorViewAssignmentComponent', () => {
  let component: InstructorViewAssignmentComponent;
  let fixture: ComponentFixture<InstructorViewAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorViewAssignmentComponent]
    });
    fixture = TestBed.createComponent(InstructorViewAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
