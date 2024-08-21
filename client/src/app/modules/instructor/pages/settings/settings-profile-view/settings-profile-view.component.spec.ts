import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsProfileViewComponent } from './settings-profile-view.component';

describe('SettingsProfileViewComponent', () => {
  let component: SettingsProfileViewComponent;
  let fixture: ComponentFixture<SettingsProfileViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsProfileViewComponent]
    });
    fixture = TestBed.createComponent(SettingsProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
