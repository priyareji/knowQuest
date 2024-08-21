import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRootComponent } from './student-root.component';

describe('StudentRootComponent', () => {
  let component: StudentRootComponent;
  let fixture: ComponentFixture<StudentRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRootComponent]
    });
    fixture = TestBed.createComponent(StudentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
