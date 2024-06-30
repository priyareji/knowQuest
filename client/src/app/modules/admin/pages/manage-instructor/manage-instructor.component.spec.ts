import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstructorComponent } from './manage-instructor.component';

describe('ManageInstructorComponent', () => {
  let component: ManageInstructorComponent;
  let fixture: ComponentFixture<ManageInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInstructorComponent]
    });
    fixture = TestBed.createComponent(ManageInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
