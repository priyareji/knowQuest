import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorComponent } from './create-instructor.component';

describe('CreateInstructorComponent', () => {
  let component: CreateInstructorComponent;
  let fixture: ComponentFixture<CreateInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInstructorComponent]
    });
    fixture = TestBed.createComponent(CreateInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
