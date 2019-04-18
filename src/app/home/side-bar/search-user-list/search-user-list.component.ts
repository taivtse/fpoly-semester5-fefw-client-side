import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchUserModel} from '../../../model/search-user.model';

@Component({
  selector: 'app-search-user-list',
  templateUrl: './search-user-list.component.html',
  styleUrls: ['./search-user-list.component.css']
})
export class SearchUserListComponent implements OnInit {
  @Input() searchUserModels: SearchUserModel[];
  @Output() searchUserClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  addNewChatBox(index: number) {
    this.searchUserClick.emit(index);
  }
}
