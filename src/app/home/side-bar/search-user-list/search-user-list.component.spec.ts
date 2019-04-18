import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserListComponent } from './search-user-list.component';

describe('SearchUserListComponent', () => {
  let component: SearchUserListComponent;
  let fixture: ComponentFixture<SearchUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
