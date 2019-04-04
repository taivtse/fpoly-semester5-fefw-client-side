import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatBoxComponent } from './new-chat-box.component';

describe('NewChatBoxComponent', () => {
  let component: NewChatBoxComponent;
  let fixture: ComponentFixture<NewChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
