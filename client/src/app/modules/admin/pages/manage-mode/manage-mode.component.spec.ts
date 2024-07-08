import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModeComponent } from './manage-mode.component';

describe('ManageModeComponent', () => {
  let component: ManageModeComponent;
  let fixture: ComponentFixture<ManageModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageModeComponent]
    });
    fixture = TestBed.createComponent(ManageModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
