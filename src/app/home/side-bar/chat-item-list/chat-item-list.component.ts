import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ChatItemComponent} from '../chat-item/chat-item.component';

@Component({
  selector: 'app-chat-item-list',
  templateUrl: './chat-item-list.component.html',
  styleUrls: ['./chat-item-list.component.css']
})
export class ChatItemListComponent implements OnInit {
  // @ViewChildren('chatItem') chatItemComponentQueryList: QueryList<ChatItemComponent>;
  a: number[] = [];
  b: Array<string> = [];

  constructor() {
  }

  ngOnInit() {
    // this.a.asdfsa = 1;
    this.a.push(1);
    this.a.push(3);
    this.a.push(2);
    const index = 1;
    const temp = this.a[index];
    this.a.splice(index, 1);
    this.a.push(temp);
    console.log(this.a);

    // this.a.
  }

  // setAllChatItemUnactive(): void {
  //
  // }

}
