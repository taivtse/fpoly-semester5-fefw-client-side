import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatItemListComponent } from './chat-item-list.component';

describe('ChatItemListComponent', () => {
  let component: ChatItemListComponent;
  let fixture: ComponentFixture<ChatItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
