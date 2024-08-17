import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSubjectListComponent } from './instructor-subject-list.component';

describe('InstructorSubjectListComponent', () => {
  let component: InstructorSubjectListComponent;
  let fixture: ComponentFixture<InstructorSubjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSubjectListComponent]
    });
    fixture = TestBed.createComponent(InstructorSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
