import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorViewAllAssignmentComponent } from './instructor-view-all-assignment.component';

describe('InstructorViewAllAssignmentComponent', () => {
  let component: InstructorViewAllAssignmentComponent;
  let fixture: ComponentFixture<InstructorViewAllAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorViewAllAssignmentComponent]
    });
    fixture = TestBed.createComponent(InstructorViewAllAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
