import {Component, OnInit} from '@angular/core';
import {ChatDataItem} from '../../../model/chat-data.item';
import {ChatDataItemService} from '../../../shared/chat-data-item.service';

@Component({
  selector: 'app-chat-item-list',
  templateUrl: './chat-item-list.component.html',
  styleUrls: ['./chat-item-list.component.css']
})
export class ChatItemListComponent implements OnInit {
  currentActiveChatItemIndex: number;

  constructor(private chatDataItemService: ChatDataItemService) {
  }

  ngOnInit() {
    const chatDataItem1 = new ChatDataItem();
    chatDataItem1.name = 'Võ Thành Tài';
    chatDataItem1.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
    chatDataItem1.lastMessageContent = 'Xin chao ban tai';
    chatDataItem1.lastMessageDate = new Date();
    chatDataItem1.chatBoxParam = '/chat/tai';
    this.chatDataItemService.chatDataItems.push(chatDataItem1);

    const chatDataItem2 = new ChatDataItem();
    chatDataItem2.name = 'Trần Hải My';
    chatDataItem2.photoUrl = 'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-1/p100x100/51585750_800173830329890_2939834964411154432_n.jpg?_nc_cat=103&_nc_ht=scontent.fsgn5-7.fna&oh=e9508c84f440971e678c1d735cb055f6&oe=5D3ED5B3';
    chatDataItem2.lastMessageContent = 'Xin chao ban my';
    chatDataItem2.lastMessageDate = new Date();
    chatDataItem2.chatBoxParam = '/chat/my';
    this.chatDataItemService.chatDataItems.push(chatDataItem2);

    this.chatDataItemService.getCurrentChatItemIndex().subscribe(index => {
      this.currentActiveChatItemIndex = index;
    });
  }

  changeActiveChatItem(index: number) {
    this.chatDataItemService.changeActiveChatItemIndex(index);
  }
}
