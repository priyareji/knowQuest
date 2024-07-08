import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmationDialogComponent } from './alert-confirmation-dialog.component';

describe('AlertConfirmationDialogComponent', () => {
  let component: AlertConfirmationDialogComponent;
  let fixture: ComponentFixture<AlertConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(AlertConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
