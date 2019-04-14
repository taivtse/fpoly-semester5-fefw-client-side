import {Component, Input, OnInit} from '@angular/core';
import {SearchUserModel} from '../../../model/search-user.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  @Input() searchUserModel: SearchUserModel;
  constructor() { }

  ngOnInit() {
  }

}
