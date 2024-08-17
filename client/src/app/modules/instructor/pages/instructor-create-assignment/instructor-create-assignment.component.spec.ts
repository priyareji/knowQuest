import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCreateAssignmentComponent } from './instructor-create-assignment.component';

describe('InstructorCreateAssignmentComponent', () => {
  let component: InstructorCreateAssignmentComponent;
  let fixture: ComponentFixture<InstructorCreateAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCreateAssignmentComponent]
    });
    fixture = TestBed.createComponent(InstructorCreateAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
