import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsProfileEditComponent } from './settings-profile-edit.component';

describe('SettingsProfileEditComponent', () => {
  let component: SettingsProfileEditComponent;
  let fixture: ComponentFixture<SettingsProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsProfileEditComponent]
    });
    fixture = TestBed.createComponent(SettingsProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
