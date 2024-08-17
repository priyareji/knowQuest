import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorRootComponent } from './instructor-root.component';

describe('InstructorRootComponent', () => {
  let component: InstructorRootComponent;
  let fixture: ComponentFixture<InstructorRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorRootComponent]
    });
    fixture = TestBed.createComponent(InstructorRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
