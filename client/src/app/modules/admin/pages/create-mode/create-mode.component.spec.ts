import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModeComponent } from './create-mode.component';

describe('CreateModeComponent', () => {
  let component: CreateModeComponent;
  let fixture: ComponentFixture<CreateModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateModeComponent]
    });
    fixture = TestBed.createComponent(CreateModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
