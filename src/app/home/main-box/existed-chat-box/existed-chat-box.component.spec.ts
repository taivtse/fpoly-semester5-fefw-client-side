import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistedChatBoxComponent } from './existed-chat-box.component';

describe('ExistedChatBoxComponent', () => {
  let component: ExistedChatBoxComponent;
  let fixture: ComponentFixture<ExistedChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistedChatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistedChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
