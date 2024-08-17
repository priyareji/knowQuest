import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLiveClassComponent } from './set-live-class.component';

describe('SetLiveClassComponent', () => {
  let component: SetLiveClassComponent;
  let fixture: ComponentFixture<SetLiveClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetLiveClassComponent]
    });
    fixture = TestBed.createComponent(SetLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
