import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchUserModel} from '../../../model/search-user.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  @Input() index: number;
  @Input() searchUserModel: SearchUserModel;
  @Output() searchUserClick = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  addNewChatBox() {
    this.searchUserClick.emit(this.index);
  }
}
