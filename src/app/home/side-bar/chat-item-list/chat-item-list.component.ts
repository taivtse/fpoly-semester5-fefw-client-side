import {Component, OnInit} from '@angular/core';
import {ChatDataItem} from '../../../model/chat-data.item';

@Component({
  selector: 'app-chat-item-list',
  templateUrl: './chat-item-list.component.html',
  styleUrls: ['./chat-item-list.component.css']
})
export class ChatItemListComponent implements OnInit {
  chatDataItems: ChatDataItem[] = [];

  constructor() {
  }

  ngOnInit() {
    const chatDataItem1 = new ChatDataItem();
    chatDataItem1.name = 'Võ Thành Tài';
    chatDataItem1.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    chatDataItem1.lastMessageContent = 'Xin chao ban minh';
    chatDataItem1.lastMessageDate = new Date();
    chatDataItem1.chatBoxParam = '/chat/tai';
    this.chatDataItems.push(chatDataItem1);

    const chatDataItem2 = new ChatDataItem();
    chatDataItem2.name = 'Trần Hải My';
    chatDataItem2.photoUrl = 'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-1/p100x100/51585750_800173830329890_2939834964411154432_n.jpg?_nc_cat=103&_nc_ht=scontent.fsgn5-7.fna&oh=e9508c84f440971e678c1d735cb055f6&oe=5D3ED5B3';
    chatDataItem2.lastMessageContent = 'Xin chao ban my';
    chatDataItem2.lastMessageDate = new Date();
    chatDataItem2.chatBoxParam = '/chat/my';
    this.chatDataItems.push(chatDataItem2);
    // this.a.asdfsa = 1;
    // this.a.push(1);
    // this.a.push(3);
    // this.a.push(2);
    // const index = 1;
    // const temp = this.a[index];
    // this.a.splice(index, 1);
    // this.a.push(temp);
    // console.log(this.a);

    // this.a.
  }
}
