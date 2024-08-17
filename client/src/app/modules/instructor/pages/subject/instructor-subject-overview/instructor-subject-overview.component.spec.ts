import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSubjectOverviewComponent } from './instructor-subject-overview.component';

describe('InstructorSubjectOverviewComponent', () => {
  let component: InstructorSubjectOverviewComponent;
  let fixture: ComponentFixture<InstructorSubjectOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSubjectOverviewComponent]
    });
    fixture = TestBed.createComponent(InstructorSubjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
