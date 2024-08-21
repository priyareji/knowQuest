import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRootComponent } from './message-root.component';

describe('MessageRootComponent', () => {
  let component: MessageRootComponent;
  let fixture: ComponentFixture<MessageRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageRootComponent]
    });
    fixture = TestBed.createComponent(MessageRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
