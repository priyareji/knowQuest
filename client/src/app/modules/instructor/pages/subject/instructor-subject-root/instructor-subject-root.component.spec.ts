import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSubjectRootComponent } from './instructor-subject-root.component';

describe('InstructorSubjectRootComponent', () => {
  let component: InstructorSubjectRootComponent;
  let fixture: ComponentFixture<InstructorSubjectRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSubjectRootComponent]
    });
    fixture = TestBed.createComponent(InstructorSubjectRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
