import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignmentRootComponent } from './instructor-assignment-root.component';

describe('InstructorAssignmentRootComponent', () => {
  let component: InstructorAssignmentRootComponent;
  let fixture: ComponentFixture<InstructorAssignmentRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAssignmentRootComponent]
    });
    fixture = TestBed.createComponent(InstructorAssignmentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
